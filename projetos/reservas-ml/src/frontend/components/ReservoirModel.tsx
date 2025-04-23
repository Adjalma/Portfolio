import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import * as THREE from 'three';

interface Props {
  wellId: string;
}

export const ReservoirModel: React.FC<Props> = ({ wellId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Inicializar Three.js
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer();

    // Configurar cena
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Adicionar modelo 3D do reservatório
    // ... código para carregar e renderizar o modelo 3D

    return () => {
      rendererRef.current?.dispose();
    };
  }, [wellId]);

  return (
    <Box ref={containerRef} sx={{ height: '400px' }}>
      <Typography variant="h6" gutterBottom>
        Modelo 3D do Reservatório
      </Typography>
    </Box>
  );
}; 