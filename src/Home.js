import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import './css/home.css';
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);

    // for work scroll up
    const scrollToHeader = () => {
      const header = document.getElementById('home-wrap');
      header.scrollIntoView({ behavior: 'smooth' });
    };

      // for get wordpress rest api
      const [posts, setPosts] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get('https://www.wunderfauks.com/wp/wp-json/acf/v3/work');
                  setPosts(response.data);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
        };
        fetchData();
        
        // for three js 3d background
        const getRandomParticelPos = (particleCount) => {
          const arr = new Float32Array(particleCount * 3);
          for (let i = 0; i < particleCount; i++) {
            arr[i] = (Math.random() - 0.5) * 10;
          }
          return arr;
        };
        
        const resizeRendererToDisplaySize = (renderer) => {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          // resize only when necessary
          if (needResize) {
            //3rd parameter `false` to change the internal canvas size
            renderer.setSize(width, height, false);
          }
          return needResize;
        };
        
        // mouse
        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });
        
        const main = () => {
          // look up the canvas
          const canvas = document.getElementById("stars");
          // create a WebGLRenderer
          const renderer = new THREE.WebGLRenderer({ canvas });
          renderer.setClearColor(new THREE.Color("#1c1b1d"));
        
          //field of view - 75deg vertical
          const fov = 75;
        
          // default a canvas is 300x150 pixels
          // which makes the aspect 300/150 or 2.
          const aspect = 2;
          const near = 0.1;
          const far = 5;
          // create a PerspectiveCamera
          const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        
          // camera defaults to looking down the -Z axis with +Y up
          // so we need to move the camera back a little from
          // the origin in order to see anything
          camera.position.z = 2;
        
          const scene = new THREE.Scene();
        
          // create a light source
          const color = 0xffffff;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-1, 2, 4);
          scene.add(light);
        
          // create a BoxGeometry
          // const boxWidth = 1;
          // const boxHeight = 1;
          // const boxDepth = 1;
          // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
          const geometry = new THREE.BufferGeometry();
          const noOfPoints = 1000; //1500;
          
          geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(noOfPoints), 3)
          );
          const loader = new THREE.TextureLoader();
          // create a basic material and set its color
          // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
          const material = new THREE.PointsMaterial({
            size: 0.05,
            map: loader.load(
              "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
            ),
            transparent: true,
            color: 0xffffff
          });
        
          // create a Mesh
          const cube = new THREE.Points(geometry, material);
        
          scene.add(cube);
          const render = (time) => {
            time *= 0.002; //in seconds
        
            if (resizeRendererToDisplaySize(renderer)) {
              const canvas = renderer.domElement;
              // changing the camera aspect to remove the strechy problem
              camera.aspect = canvas.clientWidth / canvas.clientHeight;
              camera.updateProjectionMatrix();
            }
        
            cube.rotation.x = mouseY * 0.005;
            cube.rotation.y = mouseX * 0.005;
        
            // cube.position.x = mouseX * 0.0001;
            // cube.position.y = mouseY * -0.0001;
            
            // render the scene
            renderer.render(scene, camera);
            // loop
            requestAnimationFrame(render);
          };
          requestAnimationFrame(render);
        };
        main();
        
        const timeout = setTimeout(() => {
          setIsVisible(false);
          setShowAdditionalDiv(true);
        }, 10500);

        const Loadtimeout = setTimeout(() => {
          setIsLoading(false);
        }, 2500);
    
        return () => {
          clearTimeout(timeout);
          clearTimeout(Loadtimeout);
        };
        

      }, []);
  return (
      <main>
      <div id='content'>
            {isLoading ? (
              <div className='loading-container'>
                <div className="loading-line"></div>
              </div>
            ) : (
              <div className="remove-line"></div>
            )}
        <div id='home-wrap' className='home-wrap'>
          <div className='stars'><canvas id="stars"></canvas></div>
          <div className='mv'>
            <div className='mv-inn'>
            {isVisible && (
              <div className='animate-center animate-circle' style={{ animationDelay: '10s' }}>
                <svg className='fill fill-1'>
                  <path d="M190,0 a 190,190 0 0 1 0,380 a 190,190 0 0 1 0,-380"
                      stroke-width="1"
                      fill="none" />
                </svg>
                <svg className='fill'>
                  <path d="M190,0 a 190,190 0 0 1 0,380 a 190,190 0 0 1 0,-380"
                      stroke-width="10"
                      fill="none" />
                </svg>
              </div>
              )}
              <div className='mv-txt'>
              {isVisible && (
                <dvi className='mv-animate-txt'>
                  <h1 className="fade-down" style={{ animationDelay: '3s' }}>hi,</h1>
                  <h1 className="fade-down" style={{ animationDelay: '4s' }}>We are an integrated creative agency</h1>
                  <h1 className="fade-down" style={{ animationDelay: '6s' }}>since 2010</h1>
                  <h1 className="fade-down" style={{ animationDelay: '8s' }}>transforming & growing with our clients</h1>
                  <span className='fade-out' style={{ animationDelay: '10s' }}>hold spacebar to speed up</span>
                </dvi>
                )}
                {showAdditionalDiv && (
                  <div className={showAdditionalDiv ? 'mv-sub-txt visible' : 'mv-sub-txt'}>
                    <h2 className='text-animate'>
                      <span style={{ animationDelay: '.05s' }}>c</span>
                      <span style={{ animationDelay: '.1s' }}>h</span>
                      <span style={{ animationDelay: '.15s' }}>a</span>
                      <span style={{ animationDelay: '.2s' }}>n</span>
                      <span style={{ animationDelay: '.25s' }}>g</span>
                      <span style={{ animationDelay: '.3s' }}>e</span>&nbsp;
                      <span style={{ animationDelay: '.35s' }}>i</span>
                      <span style={{ animationDelay: '.4s' }}>s</span>&nbsp;
                      <span style={{ animationDelay: '.45s' }}>t</span>
                      <span style={{ animationDelay: '.5s' }}>h</span>
                      <span style={{ animationDelay: '.55s' }}>e</span>&nbsp;
                      <span style={{ animationDelay: '.6s' }}>o</span>
                      <span style={{ animationDelay: '.65s' }}>n</span>
                      <span style={{ animationDelay: '.7s' }}>l</span>
                      <span style={{ animationDelay: '.75s' }}>y</span>&nbsp;
                      <span style={{ animationDelay: '.8s' }}>c</span>
                      <span style={{ animationDelay: '.85s' }}>o</span>
                      <span style={{ animationDelay: '.9s' }}>n</span>
                      <span style={{ animationDelay: '1s' }}>s</span>
                      <span style={{ animationDelay: '1.05s' }}>t</span>
                      <span style={{ animationDelay: '1.15s' }}>a</span>
                      <span style={{ animationDelay: '1.2s' }}>n</span>
                      <span style={{ animationDelay: '1.25s' }}>t</span>
                    </h2>
                  </div>
                )}
              </div>
              <div id='work-down' onClick={scrollToHeader}>
                <p>Works
                  <span><img src="/images/dropdown-arrow.png" alt='down arrow'></img></span>
                </p>
              </div>
            </div>
          </div>
          <div className='whatsapp'>
            <a href="https://wa.me/+6582011579?text=I'm%20interested%20in%20your%20services" target='_blank' className='whatsapp-icon'><img src="/images/WhatsApp.svg" alt='whatsapp'></img></a>
          </div>
          <div id='works' className='works'>
            <div className='works-inn'>
              <div className='works-flex d-flex'>
              {posts.map((post,index) => (
                <div className='works-info' id={post.id}>
                  <a href={post.acf.image.link} target="_blank" rel="noopener noreferrer">
                    <div className='works-image'><img src={post.acf.image.sizes.medium_large} alt="works image" /></div>
                    <div className='works-description'>
                      <h2 className='works-ttl'>{post.acf.client}</h2>
                      <p className='works-txt'>{post.acf.work_category}</p>
                      <span className='post-number'>{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                  </a>
                </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </main>
  );
}

export default Home;
