from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from datetime import datetime
from typing import List, Dict
import simpy
import json

app = FastAPI(title="Simulação de Processos Industriais")

class ProcessData(BaseModel):
    process_id: str
    timestamp: str
    equipment: List[dict]  # [{id, type, capacity, status}]
    flows: List[dict]  # [{source, target, material, rate}]
    parameters: Dict[str, float]  # {temperature, pressure, etc}
    constraints: Dict[str, dict]  # {param: {min, max, target}}

class SimulationConfig(BaseModel):
    duration: int  # horas
    time_step: int  # minutos
    scenarios: List[dict]  # [{name, parameters}]

@app.post("/simulate/process")
async def simulate_process(data: ProcessData, config: SimulationConfig):
    try:
        # Criar ambiente de simulação
        env = create_simulation_environment(data)
        
        # Executar simulação para cada cenário
        results = []
        for scenario in config.scenarios:
            # Configurar cenário
            setup_scenario(env, scenario, data)
            
            # Executar simulação
            scenario_results = run_simulation(
                env,
                data,
                config.duration,
                config.time_step
            )
            
            # Analisar resultados
            analysis = analyze_results(scenario_results, data.constraints)
            
            results.append({
                "scenario": scenario["name"],
                "results": scenario_results,
                "analysis": analysis,
                "recommendations": generate_recommendations(analysis)
            })
        
        return {
            "process_id": data.process_id,
            "timestamp": datetime.now().isoformat(),
            "scenarios": results,
            "optimal_scenario": select_optimal_scenario(results)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_simulation_environment(data: ProcessData) -> simpy.Environment:
    env = simpy.Environment()
    
    # Criar recursos para cada equipamento
    for equipment in data.equipment:
        equipment["resource"] = simpy.Resource(
            env,
            capacity=equipment["capacity"]
        )
    
    return env

def setup_scenario(
    env: simpy.Environment,
    scenario: dict,
    data: ProcessData
) -> None:
    # Aplicar parâmetros do cenário
    for param, value in scenario["parameters"].items():
        data.parameters[param] = value
    
    # Resetar ambiente
    env.reset()

def run_simulation(
    env: simpy.Environment,
    data: ProcessData,
    duration: int,
    time_step: int
) -> List[dict]:
    results = []
    current_time = 0
    
    while current_time < duration * 60:  # Converter horas para minutos
        # Simular fluxos
        flows = simulate_flows(env, data.flows, data.parameters)
        
        # Simular equipamentos
        equipment_states = simulate_equipment(
            env,
            data.equipment,
            flows
        )
        
        # Registrar estado do processo
        results.append({
            "timestamp": current_time,
            "flows": flows,
            "equipment_states": equipment_states,
            "parameters": data.parameters.copy()
        })
        
        # Avançar simulação
        env.run(until=current_time + time_step)
        current_time += time_step
    
    return results

def simulate_flows(
    env: simpy.Environment,
    flows: List[dict],
    parameters: Dict[str, float]
) -> List[dict]:
    simulated_flows = []
    
    for flow in flows:
        # Calcular taxa de fluxo considerando parâmetros
        rate = calculate_flow_rate(
            flow["rate"],
            parameters,
            flow["material"]
        )
        
        simulated_flows.append({
            "source": flow["source"],
            "target": flow["target"],
            "material": flow["material"],
            "actual_rate": rate
        })
    
    return simulated_flows

def simulate_equipment(
    env: simpy.Environment,
    equipment: List[dict],
    flows: List[dict]
) -> List[dict]:
    states = []
    
    for equip in equipment:
        # Calcular carga do equipamento
        load = calculate_equipment_load(equip, flows)
        
        # Atualizar estado
        state = update_equipment_state(equip, load)
        
        states.append({
            "id": equip["id"],
            "type": equip["type"],
            "load": load,
            "state": state,
            "efficiency": calculate_efficiency(equip, load)
        })
    
    return states

def calculate_flow_rate(
    base_rate: float,
    parameters: Dict[str, float],
    material: str
) -> float:
    # Implementar cálculos específicos por tipo de material
    temperature_factor = np.exp(-0.1 * (parameters["temperature"] - 25) / 25)
    pressure_factor = parameters["pressure"] / 100
    
    return base_rate * temperature_factor * pressure_factor

def calculate_equipment_load(
    equipment: dict,
    flows: List[dict]
) -> float:
    # Calcular carga baseado nos fluxos de entrada/saída
    input_flow = sum(
        f["actual_rate"] for f in flows
        if f["target"] == equipment["id"]
    )
    
    output_flow = sum(
        f["actual_rate"] for f in flows
        if f["source"] == equipment["id"]
    )
    
    return max(input_flow, output_flow) / equipment["capacity"]

def update_equipment_state(equipment: dict, load: float) -> str:
    if load > 0.9:
        return "overload"
    elif load > 0.7:
        return "high_load"
    elif load > 0.3:
        return "normal"
    return "low_load"

def calculate_efficiency(equipment: dict, load: float) -> float:
    # Implementar curva de eficiência específica por tipo
    if equipment["type"] == "pump":
        return -0.5 * (load - 0.7)**2 + 0.95
    elif equipment["type"] == "reactor":
        return -0.3 * (load - 0.8)**2 + 0.98
    return -0.4 * (load - 0.75)**2 + 0.96

def analyze_results(
    results: List[dict],
    constraints: Dict[str, dict]
) -> dict:
    analysis = {
        "violations": [],
        "efficiency": {
            "mean": 0.0,
            "min": 1.0,
            "max": 0.0
        },
        "stability": 0.0
    }
    
    for step in results:
        # Verificar violações
        for param, value in step["parameters"].items():
            if param in constraints:
                if value < constraints[param]["min"]:
                    analysis["violations"].append({
                        "parameter": param,
                        "value": value,
                        "limit": "min",
                        "timestamp": step["timestamp"]
                    })
                elif value > constraints[param]["max"]:
                    analysis["violations"].append({
                        "parameter": param,
                        "value": value,
                        "limit": "max",
                        "timestamp": step["timestamp"]
                    })
        
        # Calcular eficiência
        step_efficiency = np.mean([
            e["efficiency"] for e in step["equipment_states"]
        ])
        analysis["efficiency"]["mean"] += step_efficiency
        analysis["efficiency"]["min"] = min(
            analysis["efficiency"]["min"],
            step_efficiency
        )
        analysis["efficiency"]["max"] = max(
            analysis["efficiency"]["max"],
            step_efficiency
        )
    
    # Finalizar cálculos
    analysis["efficiency"]["mean"] /= len(results)
    
    # Calcular estabilidade
    variations = []
    for i in range(1, len(results)):
        for param in results[i]["parameters"]:
            variation = abs(
                results[i]["parameters"][param] -
                results[i-1]["parameters"][param]
            )
            variations.append(variation)
    
    analysis["stability"] = 1.0 - np.mean(variations) / 100
    
    return analysis

def generate_recommendations(analysis: dict) -> List[dict]:
    recommendations = []
    
    # Recomendações baseadas em violações
    if len(analysis["violations"]) > 0:
        recommendations.append({
            "type": "safety",
            "priority": "high",
            "description": "Ajustar limites operacionais",
            "details": f"{len(analysis['violations'])} violações detectadas"
        })
    
    # Recomendações baseadas em eficiência
    if analysis["efficiency"]["mean"] < 0.8:
        recommendations.append({
            "type": "optimization",
            "priority": "medium",
            "description": "Otimizar condições operacionais",
            "details": f"Eficiência média: {analysis['efficiency']['mean']:.2%}"
        })
    
    # Recomendações baseadas em estabilidade
    if analysis["stability"] < 0.9:
        recommendations.append({
            "type": "control",
            "priority": "high",
            "description": "Melhorar controle de processo",
            "details": f"Estabilidade: {analysis['stability']:.2%}"
        })
    
    return recommendations

def select_optimal_scenario(results: List[dict]) -> dict:
    # Pontuar cada cenário
    scores = []
    for scenario in results:
        score = calculate_scenario_score(scenario)
        scores.append({
            "name": scenario["scenario"],
            "score": score
        })
    
    # Selecionar melhor cenário
    optimal = max(scores, key=lambda x: x["score"])
    
    return {
        "name": optimal["name"],
        "score": optimal["score"],
        "details": "Melhor combinação de eficiência e estabilidade"
    }

def calculate_scenario_score(scenario: dict) -> float:
    # Pesos dos critérios
    weights = {
        "violations": 0.4,
        "efficiency": 0.3,
        "stability": 0.3
    }
    
    # Calcular pontuação
    violation_score = max(0, 1 - len(scenario["analysis"]["violations"]) / 10)
    efficiency_score = scenario["analysis"]["efficiency"]["mean"]
    stability_score = scenario["analysis"]["stability"]
    
    return (
        weights["violations"] * violation_score +
        weights["efficiency"] * efficiency_score +
        weights["stability"] * stability_score
    ) 