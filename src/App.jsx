import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { UI } from "./components/UI"

function App() {

  return (
    <>
      {/* Memanggil Komponen UI */}
      <UI/>
      
      {/* Komponen Canvas dari @react-three/fiber untuk membuat area 3D */}
      <Canvas camera={{ position: [3, 3, 3] }}>
        {/* Menentukan warna latar belakang canvas (warna background) */}
        <color attach="background" args={["#333333"]} />
  
        {/* OrbitControls adalah komponen yang memungkinkan pengguna mengendalikan tampilan kamera dengan mouse */}
        <OrbitControls/>
        
        {/* Membuat sebuah mesh atau objek 3D yang terdiri dari geometri (bentuk) dan material (penampilan visual) */}
        <mesh>
          {/* boxGeometry menentukan bentuk objek, dalam hal ini adalah kubus dengan ukuran 0.5x0.5x0.5 */}
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          
          {/* meshNormalMaterial adalah material yang memberikan efek normal pada permukaan mesh sehingga tampak bergaya wireframe atau reflektif */}
          <meshNormalMaterial/>
        </mesh>
      </Canvas>
    </>
  )  
}

export default App
