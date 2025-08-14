import React, { useEffect, useRef } from "react";
import "./App.css";
import Button1 from "./button1";
import Header from "./Header";
import AlbumGallerys from "./AlbumGallery";

function App() {
  const blobCount = 10;
  const blobsRef = useRef([]);
  const blobsData = useRef([]);

  useEffect(() => {
    function randInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const minSpeed = 0.2;
    const maxSpeed = 0.3;

    // Initialize blobs
    blobsData.current = Array.from({ length: blobCount }, () => {
      const size = 180;
      let speed = randInRange(minSpeed, maxSpeed);

      let vx = (Math.random() < 0.5 ? -1 : 1) * speed;
      let vy = (Math.random() < 0.5 ? -1 : 1) * speed;

      // Ensure minimum speed
      vx = Math.abs(vx) < minSpeed ? (vx < 0 ? -minSpeed : minSpeed) : vx;
      vy = Math.abs(vy) < minSpeed ? (vy < 0 ? -minSpeed : minSpeed) : vy;

      // Rotation
      const rotation = randInRange(0, 360);
      const rotationSpeed = randInRange(-0.2, 0.2); // degrees per frame

      return {
        x: randInRange(0, window.innerWidth - size),
        y: randInRange(0, window.innerHeight - size),
        vx,
        vy,
        size,
        rotation,
        rotationSpeed
      };
    });

    function moveBlobs() {
      const data = blobsData.current;

      for (let i = 0; i < data.length; i++) {
        const b = data[i];

        // Wandering: slightly adjust velocity
        b.vx += randInRange(-0.1, 0.1);
        b.vy += randInRange(-0.1, 0.1);

        // Clamp velocity to min/max
        b.vx = Math.sign(b.vx) * Math.max(Math.abs(b.vx), minSpeed);
        b.vy = Math.sign(b.vy) * Math.max(Math.abs(b.vy), minSpeed);
        b.vx = Math.sign(b.vx) * Math.min(Math.abs(b.vx), maxSpeed);
        b.vy = Math.sign(b.vy) * Math.min(Math.abs(b.vy), maxSpeed);

        // Update position
        b.x += b.vx;
        b.y += b.vy;

        // Update rotation
        b.rotation += b.rotationSpeed;

        // Edge collisions (no easing)
        if (b.x <= 0) b.vx *= -1;
        if (b.x + b.size >= window.innerWidth) b.vx *= -1;
        if (b.y <= 0) b.vy *= -1;
        if (b.y + b.size >= window.innerHeight) b.vy *= -1;

        // Blob collisions (edge-based)
        for (let j = i + 1; j < data.length; j++) {
          const b2 = data[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radiusSum = b.size / 2 + b2.size / 2;

          if (dist < radiusSum) {
            // Swap velocities
            [b.vx, b2.vx] = [b2.vx, b.vx];
            [b.vy, b2.vy] = [b2.vy, b.vy];
          }
        }
      }

      // Apply transforms
      data.forEach((b, idx) => {
        const el = blobsRef.current[idx];
        if (el) {
          el.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.rotation}deg)`;
        }
      });

      requestAnimationFrame(moveBlobs);
    }

    moveBlobs();
  }, []);

return (
  <>
    {/* Floating blobs */}
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none saturate-180">
      {Array.from({ length: blobCount }).map((_, idx) => {
        const blobGradients = [
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-800",
          "bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400",
          "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
          "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500",
          "bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400",
          "bg-gradient-to-r from-teal-400 via-green-400 to-lime-400",
          "bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400",
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          "bg-gradient-to-r from-red-400 via-pink-400 to-purple-400",
          "bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400",
        ];

        return (
          <div
            key={idx}
            ref={(el) => (blobsRef.current[idx] = el)}
            className={`absolute size-70 rounded-full blur-3xl opacity-60 origin-center ${blobGradients[idx % blobGradients.length]}`}
          ></div>
        );
      })}

    </div>

    {/* Your content */}
    <div className="relative z-10">
      <Header />
      <div className="grow">
        <div className="flex flex-row justify-center py-13">
          <p className="font-[Lexend] font-extralight text-5xl px-10">Albums</p>
          <AlbumGallerys />
        </div>
      </div>
    </div>
  </>
);

}

export default App;
