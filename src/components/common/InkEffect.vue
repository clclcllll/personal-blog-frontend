<template>
  <div ref="container" class="ink-effect w-full h-full absolute inset-0" @click="handleClick"></div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'InkEffect',
  data() {
    return {
      mouseClick: new THREE.Vector2(-1, -1), // 点击初始化为屏幕外
      clickTime: 0, // 点击发生的时间
    };
  },
  mounted() {
    this.initInkEffect();
  },
  methods: {
    initInkEffect() {
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 场景
      const scene = new THREE.Scene();

      // 摄像机
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      scene.add(camera);

      // 渲染器
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // 创建平面几何体用于展示水流效果
      const geometry = new THREE.PlaneGeometry(2, 2);

      // GLSL 着色器代码
      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision mediump float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_click;
        uniform float u_clickTime;

        // 分形噪声函数
        float fractalNoise(vec2 p) {
          float scale = 1.0;
          float noiseSum = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 2; i++) {
              noiseSum += amplitude * sin(scale * p.x) * cos(scale * p.y);
              scale *= 2.0;
              amplitude *= 0.5;
          }
          return noiseSum;
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution;
          float time = u_time;

          // 计算水流的分形噪声
          float flow = fractalNoise(st * 5.0 + vec2(0.0, time * 0.2));
          flow += 0.3 * fractalNoise(st * 10.0 - vec2(time * 0.3, 0.0));
          flow += 0.1 * fractalNoise(st * 15.0 + vec2(time * 0.1, time * 0.3));

          // 点击涟漪效果
          if (u_clickTime > 0.0) {
            float dist = distance(st, u_click / u_resolution);
            float ripple = sin(10.0 * dist - (time - u_clickTime) * 5.0) * 0.05;
            ripple *= exp(-dist * 10.0); // 随距离衰减
            flow += ripple;
          }

          // 墨水渐变效果
          vec3 color = vec3(0.0, 0.3, 0.6 + flow * 0.25);
          color.g += 0.5 * flow;

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      // 创建着色器材质
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_resolution: { value: new THREE.Vector2(width, height) },
          u_time: { value: 0.0 },
          u_click: { value: this.mouseClick },
          u_clickTime: { value: this.clickTime },
        },
      });

      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      // 动画函数
      const animate = () => {
        material.uniforms.u_time.value += 0.05;
        material.uniforms.u_click.value = this.mouseClick;
        material.uniforms.u_clickTime.value = this.clickTime;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      // 监听窗口大小变化
      window.addEventListener("resize", () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        material.uniforms.u_resolution.value.set(width, height);
      });
    },

    // 处理点击事件
    handleClick(event) {
      const container = this.$refs.container;
      const rect = container.getBoundingClientRect();

      // 更新点击坐标和时间
      this.mouseClick.x = event.clientX - rect.left;
      this.mouseClick.y = rect.height - (event.clientY - rect.top); // 翻转 y 轴坐标
      this.clickTime = performance.now() / 1000; // 当前时间（秒）
    },
  },
};
</script>
