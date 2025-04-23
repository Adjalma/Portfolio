import * as THREE from 'three';

declare module 'three' {
  interface Scene extends THREE.Object3D {
    add(object: THREE.Object3D): this;
    remove(object: THREE.Object3D): this;
  }

  interface PerspectiveCamera extends THREE.Camera {
    position: THREE.Vector3;
    lookAt(target: THREE.Vector3): void;
  }

  interface WebGLRenderer {
    setSize(width: number, height: number): void;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
    domElement: HTMLCanvasElement;
  }
}
