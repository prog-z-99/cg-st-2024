import { Container, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Main from "../components/Main";

export default function Smoke() {
  const [value, setValue] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    if (value) {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function () {
        image.src = reader.result;
      };
      image.addEventListener("load", function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 960;
        canvas.height = (image.height / image.width) * 960;

        let particlesArray = [];
        const numberOfParticles = 20000;
        const detail = 2;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let grid = [];
        for (let y = 0; y < canvas.height; y += detail) {
          let row = [];
          for (let x = 0; x < canvas.width; x += detail) {
            const red = pixels.data[y * 4 * pixels.width + x * 4];
            const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
            const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
            const color = "rgb(" + red + "," + green + "," + blue + ")";
            const brightness = calculateBrightness(red, green, blue) / 100;
            const cell = [color, brightness];
            row.push(cell);
          }
          grid.push(row);
        }
        console.log(grid);
        class Particle {
          constructor() {
            this.x = Math.random(5) * canvas.width;
            this.y = canvas.height;
            this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 0.8;
            this.size = Math.random() * 2 + 0.5;
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            this.angle = 0;
          }
          update() {
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            if (grid[this.position1]) {
              if (grid[this.position1][this.position2]) {
                this.speed = grid[this.position1][this.position2][1];
              }
            }
            this.angle += this.speed / 20;
            let movement = 2.5 - this.speed + this.velocity;
            this.y -= movement + Math.cos(this.angle) * 2;
            this.x += Math.cos(this.angle) * 2;
            if (this.y <= 0) {
              this.y = canvas.height;
              this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
          }
          draw() {
            ctx.beginPath();
            ctx.fillStyle = "black";
            if (this.y > canvas.height - this.size * 6) ctx.globalAlpha = 0;
            if (grid[this.position1]) {
              if (grid[this.position1][this.position2]) {
                ctx.fillStyle = grid[this.position1][this.position2][0];
              }
            } else {
              ctx.fillStyle = "white";
            }
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        function init() {
          for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
          }
        }
        init();

        function animate() {
          ctx.globalAlpha = 0.05;
          ctx.fillStyle = "rgb(0, 0, 0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 0.2;
          for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
          }
          requestAnimationFrame(animate);
        }
        animate();

        function calculateBrightness(red, green, blue) {
          return Math.sqrt(
            red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
          );
        }
      });
    }

    return () => {
      image.removeEventListener("load", () => {});
    };
  }, [value]);

  return (
    <Container>
      <Text size={"xl"} mt={50}>
        Smoke Effect
      </Text>
      <Main value={value} setValue={setValue} />
      <canvas id="canvas1" ref={canvasRef} />
    </Container>
  );
}
