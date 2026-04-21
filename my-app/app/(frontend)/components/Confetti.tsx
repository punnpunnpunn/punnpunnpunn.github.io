'use client';

import { useEffect, useRef } from 'react';

type ConfettiProps = {
  burstOrigins?: Array<{ x: number; y: number; id: number }> | null;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  element: HTMLDivElement;
}

const Confetti = ({ burstOrigins }: ConfettiProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeAnimationsRef = useRef<Map<number, { particles: Particle[], animationId: number, startTime: number }>>(new Map());

  useEffect(() => {
    if (!burstOrigins || burstOrigins.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Only process the latest burst origin to avoid re-triggering old animations
    const latestOrigin = burstOrigins[burstOrigins.length - 1];
    if (!activeAnimationsRef.current.has(latestOrigin.id)) {
      const particles: Particle[] = [];
      const startTime = Date.now();
      const generationTime = 1500; // Stop creating new particles after 1.5 seconds

      const createParticle = () => {
        const emoji = document.createElement('div');
        emoji.textContent = '🗿';
        emoji.style.position = 'fixed';
        emoji.style.fontSize = `30px`;
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '50';
        container.appendChild(emoji);

        const particle: Particle = {
          x: Math.random() * window.innerWidth,
          y: -50,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5,
          opacity: 1,
          element: emoji,
        };

        particles.push(particle);
      };

      // Create initial batch of particles
      for (let i = 0; i < 50; i++) {
        createParticle();
      }

      const animate = () => {
        const elapsed = Date.now() - startTime;

        // Create new particles continuously until generation time is up
        if (elapsed < generationTime) {
          // Create about 5-6 particles per frame for denser rain
          if (Math.random() < 0.7) {
            createParticle();
          }
        }

        // Update and filter particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];

          // Update position (rain falling down)
          p.x += p.vx;
          p.y += p.vy;

          // Update rotation
          p.rotation += p.rotationSpeed;

          // Fade out when near bottom
          const bottomNotchStart = window.innerHeight - 200;
          if (p.y > bottomNotchStart) {
            p.opacity = Math.max(0, 1 - (p.y - bottomNotchStart) / 200);
          }

          // Apply styles
          p.element.style.left = `${p.x}px`;
          p.element.style.top = `${p.y}px`;
          p.element.style.transform = `rotate(${p.rotation}deg)`;
          p.element.style.opacity = `${p.opacity}`;

          // Remove particle if it's completely off screen
          if (p.y > window.innerHeight + 50) {
            p.element.remove();
            particles.splice(i, 1);
          }
        }

        // Continue animation if there are still particles or generation time hasn't ended
        if (particles.length > 0 || elapsed < generationTime) {
          const animationId = requestAnimationFrame(animate);
          activeAnimationsRef.current.set(latestOrigin.id, { particles, animationId, startTime });
        } else {
          // Animation finished, clean up this specific animation
          activeAnimationsRef.current.delete(latestOrigin.id);
        }
      };

      const animationId = requestAnimationFrame(animate);
      activeAnimationsRef.current.set(latestOrigin.id, { particles, animationId, startTime });
    }

    // Don't clean up in the effect cleanup - let animations finish naturally
    return () => {
      // Only clean up on component unmount
    };
  }, [burstOrigins]);

  // Separate effect for component unmount cleanup
  useEffect(() => {
    const currentAnimations = activeAnimationsRef.current;
    return () => {
      // Clean up all active animations on unmount
      currentAnimations.forEach(({ animationId, particles }) => {
        cancelAnimationFrame(animationId);
        particles.forEach((p) => p.element.remove());
      });
      currentAnimations.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};

export default Confetti;



