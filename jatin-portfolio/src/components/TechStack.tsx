import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Html, Decal, Environment } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";
import "./styles/TechStack.css";

const TOOLS = [
  { name: "K8s", color: "#326CE5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Docker", color: "#2496ED", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "AWS", color: "#FF9900", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "GCP", color: "#4285F4", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
  { name: "Terraform", color: "#7B42BC", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
  { name: "Ansible", color: "#EE0000", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
  { name: "Prometheus", color: "#E6522C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
  { name: "Grafana", color: "#F46800", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
  { name: "Jenkins", color: "#D33833", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
  { name: "Python", color: "#3776AB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Bash", color: "#4EAA25", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
  { name: "Nginx", color: "#009639", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "Azure", color: "#0078D4", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "GitLab", color: "#FC6D26", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
  { name: "Helm", color: "#0F1689", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg" },
  { name: "ArgoCD", color: "#EF7B4D", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-plain.svg" },
  { name: "Packer", color: "#02A8EF", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/packer/packer-original.svg" },
  { name: "GitHub", color: "#2088FF", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "MySQL", color: "#4479A1", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Redis", color: "#DC382D", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Kafka", color: "#231F20", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
  { name: "Go", color: "#00ADD8", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "Elastic", color: "#005571", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "Linux", color: "#FCC624", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

type SphereItem = { scale: number; toolIndex: number };
const sphereItems: SphereItem[] = TOOLS.map((_, i) => ({
  scale: [0.8, 0.9, 1.0, 1.1, 1.2][Math.floor(Math.random() * 5)],
  toolIndex: i,
}));

function PhysicsSphere({ scale, toolIndex, isActive }: SphereItem & { isActive: boolean }) {
  const api = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const r = THREE.MathUtils.randFloatSpread;
  const tool = TOOLS[toolIndex];
  
  const texture = useTexture(tool.url as string) as THREE.Texture;
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const [hovered, setHover] = useState(false);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: tool.color,
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    [tool.color]
  );

  useFrame((_s, delta) => {
    if (!api.current || !isActive) return;
    const dt = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation() as THREE.Vector3)
      .normalize()
      .multiply(new THREE.Vector3(-40 * dt * scale, -100 * dt * scale, -40 * dt * scale));
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={api}
      linearDamping={0.7}
      angularDamping={0.1}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        geometry={sphereGeometry}
        material={material}
        scale={scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.2} map={texture} />
        {/* Put a decal on the back too so it's always visible when spinning */}
        <Decal position={[0, 0, -1]} rotation={[0, Math.PI, 0]} scale={1.2} map={texture} />
        
        {hovered && (
          <Html distanceFactor={15} center>
            <div className="tech-label" style={{ 
              background: 'rgba(10, 15, 30, 0.9)', 
              color: '#00ffff', 
              padding: '6px 12px', 
              borderRadius: '6px',
              border: '1px solid rgba(0,255,255,0.3)',
              fontSize: '14px',
              fontWeight: 600,
              backdropFilter: 'blur(5px)',
              pointerEvents: 'none',
              transform: `translateY(-${50 * scale}px)`,
              whiteSpace: 'nowrap'
            }}>
              {tool.name}
            </div>
          </Html>
        )}
      </mesh>
    </RigidBody>
  );
}

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const target = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(target);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2.5]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="techstack" className="techstack-section" ref={sectionRef}>
      <div className="container" style={{ pointerEvents: 'none' }}>
        <div className="section-title techstack-intro">
          <h2>Infrastructure <span>Stack</span></h2>
          <p>Drag your cursor to push the tools. All production scales.</p>
        </div>
      </div>
      
      <div className="tech-canvas-wrap" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 100 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.5} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          
          <Suspense fallback={null}>
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {sphereItems.map((props, i) => (
                <PhysicsSphere key={i} {...props} isActive={isActive} />
              ))}
            </Physics>
            <Environment preset="city" environmentIntensity={0.3} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
