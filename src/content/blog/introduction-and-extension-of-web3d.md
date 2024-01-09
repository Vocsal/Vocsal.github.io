---
title: "Web3D介绍与扩展"
description: "Web3D的介绍和Threejs的实践"
pubDate: 2022-06-08 14:00:00 +0800
heroImage: "https://tiiny.host/blog/assets/images/1_adcnxab1qc_5kf8juxdeya.png"
categories: [图形学]
tag: []
math: true
---

## 一、前言

得益于摩尔定律带来的硬件爆炸式性能提升和科技技术不断进步更新迭代，使得 Web 应用进入了 3D 的时代。

### WebGL 与 WebGpu

WebGL 是基于 OpenGL ES 2.0 的 Web 标准，可以通过 HTML5 Canvas 元素作为 DOM 接口进行访问。

WebGPU 是最新的 Web3D 图形 API，更加直接对 GPU 进行编程，降低驱动开销，提高性能，支持多线程。

本次分享我将会带来 threejs 的简单介绍，以及 react、three 和 spaceVR 三者结合的使用。

## 二、3D 实例

[Solar 3D](https://www.code01.cn/solar3d/index.html) -[Github](https://github.com/Vocsal/Solar3D)

太阳系 3D 系统，具有同步卫星、飞行、轨道三个视角，模拟太阳系行星运转。

[Muse](https://www.muse.place/)

Muse 3D 空间，展示个人作品，模拟真实的访客场景。

[Townscaper](https://oskarstalberg.com/Townscaper/)

城市设计师，可以设计属于自己的城市景观，并且可以进行分享。

[Skyline](https://skyline.github.com/)

数据展示 github 用户一年 3D 贡献图，可以进行分享、打印或者更多操作。

## 三、介绍

### 工具

- **[Three.js](https://threejs.org/)**

开源，强大且轻量的 JavaScript 3D 库，封装底层图形接口，降低 Web3D 的开发复杂度

- **[Babylon.js](https://www.babylonjs.com/)**

一个完整的 JavaScript 框架，可以用于构建 H5、WebGL、WebVR 和 Web Audio 等 3D 游戏和体验

- **[WebGLStudio.js](https://webglstudio.org/)**

一个完全基于浏览器的[游戏引擎](https://so.csdn.net/so/search?q=游戏引擎&spm=1001.2101.3001.7020)，具有完整的可视化编辑器

- **[PlayCanvas](https://playcanvas.com)**

一个基于 WebGL 的游戏引擎，结合了物理、光影、音效等工具用于创建一个复杂的界面

- **[Egret](https://www.egret.com/)**

白鹭，游戏开发引擎和解决方案，包含游戏开发框架、开发辅助工具、完善的生态环境，基于 Typescript 开发，支持跨平台

- **[Layabox](https://www.layabox.com/)**

与白鹭 Egret 提供一整套游戏开发解决方案。

### 相关概念

- 照相机 Camera

照相机相当于人的眼睛，主要用于将三位空间投影至二维平面中。

**透视投影照相机 Perspective Camera**：具有视角，相当于现实世界中的景象，拥有“近大远小”的效果。在需要模拟生活场景时进行应用。

<img src="/images/introduction-and-extension-of-web3d/透视投影照相机.png" alt="透视投影照相机"  />

**正交投影照相机 Orthographic Camera**：物体效果不变，三维空间物体的关系在二维空间照常维持。通常用于制图和建模等。

<img src="/images/introduction-and-extension-of-web3d/正交投影照相机.png" alt="正交投影照相机" style="zoom: 50%;" />

- 几何形状 Geometry

几何形状决定了物体的顶点位置信息等，常见几何形状有长方体 Cube、平面 Plane、球体 Sphere、圆形 Circle、圆柱体 Cylinder 和文字形状 Text 等。开发者可以在 3D 建模工具中，进行更为复杂的形状绘制，然后进行导入自定义形状。

- 材质 material

材质相当于人的肤色和纹理，是独立于物体顶点信息之外的与渲染效果相关的属性。通过设置材质可以改变物体的颜色、纹理贴图、光照模式等。

- 光与阴影

光和阴影是 _物体_ 立体效果的体现。

**环境光 Ambient**：环境光没有明确的光源位置，在各处形成的亮度一致。

**点光源 Point**：光由一个点产生，向周围发散，不计光源大小，亮度线性递减。

**平行光 Directional**：光源在场景中，顺着一个方向（法向量）照射，对于任何平行的平面，平行光照射的亮度相同。

**聚光灯 Spot**：一种特殊的点光源，朝着一个方向照射出圆锥形的光线。

## 四、实践

基于 Three.js 的开发流程

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web 3D Example</title>
    <script src="https://cdn.jsdelivr.net/npm/three@0.122.0/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.101.1/examples/js/controls/OrbitControls.js"></script>
  </head>

  <body onload="init()">
    <script>
      function init() {
        // 渲染器
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000); // 清除颜画布颜色
        document.body.appendChild(renderer.domElement);

        // 场景
        var scene = new THREE.Scene();

        // 照相机
        var camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          50
        );
        camera.position.set(0, 0, 30);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        // 物体
        var box = new THREE.Mesh(
          new THREE.BoxGeometry(10, 10, 10),
          new THREE.MeshPhongMaterial({
            color: 0x156289,
          })
        );
        scene.add(box);

        // 光
        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        // 控制器
        const orbit = new THREE.OrbitControls(camera, renderer.domElement);
        orbit.enableZoom = false;

        // 渲染
        function render() {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
        }
        render();
      }
    </script>
  </body>
</html>
```

\*更多可查看 Solar3D [Base Class](https://github.com/Vocsal/Solar3D/blob/master/src/js/three/base.ts)

## 五、衍生

### 矩阵变换

**旋转**

$$
R_x(\beta)=
\begin{bmatrix}
cos\beta & sin\beta & 0 & 0 \\
-sin\beta & cos\beta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

$$
R_y(\alpha)=
\begin{bmatrix}
-sin\alpha & 0 & cos\alpha & 0 \\
0 & 1 & 0 & 0 \\
cos\alpha & 0 & sin\alpha & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

$$
R_z(\theta)=
\begin{bmatrix}
cos\theta & sin\theta & 0 & 0 \\
-sin\theta & cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

**缩放**

$$
Z(n)=
\begin{bmatrix}
n & 0 & 0 & 0\\
0 & n & 0 & 0\\
0 & 0 & n & 0\\
0 & 0 & 0 & 1
\end{bmatrix}
$$

**平移**

$$
T(a, b, c)=
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
a & b & c & 1
\end{bmatrix}
$$

在三维坐标系中，任何变换都可通过上述三种变换进行组合

\*[推导过程](/blog/basic-mathematics-of-computer-graphics/)

其他：欧拉角、四元数

### WebGl 渲染管线

**顶点着色器 Vertex Shader**：处理顶点执行的模型变换等，计算顶点的位置、颜色等

**片元着色器 Fragment Shader**：处理由光栅化阶段生成的每个片元，最终计算出每个像素的最终颜色

**GLSL**：OpenGL Shading Language，着色器的编程语言，类 C 语言

![WebGl渲染管线](/images/introduction-and-extension-of-web3d/WebGl渲染管线.png)

### React + Next + SpacesVR

目前一套比较成熟的 Web3D 技术

[Next.js](https://www.nextjs.cn/)提供生产环境所需的所有功能以及最佳的开发体验：包括静态及服务器端融合渲染、 支持 TypeScript、智能化打包、 路由预取等功能 无需任何配置

```sh
npx create-next-app project-name
```

[SpacesVR](https://github.com/spacesvr/spacesvr)提供一套 Web3D 工具和组件，组件包含`Environment/StandardEnvironment`(包含一些钩子等)、`Arrow`、`Audio`、`Background`、`Fog`、`HDRI`、`Image`、`Logo`、`Text`、`Video`、`FacePlayer`、`Tool`等

[@react-three-fiber](https://github.com/pmndrs/react-three-fiber)提供 threejs api 支持

[@react-three/cannon](https://github.com/pmndrs/use-cannon)提供物理系统

其他@react-three/drei、@react-three/gltfjsx 等

可查看 [github muse place](https://github.com/wugengsong/muse-place)

## 六、应用

- 游戏
- WebVR
- 数据可视化
- 地图

## 七、总结与探讨

- 总结

总体来说 Web3D 是一块比较成熟和飞速发展前进的领域，对于未来 Web 网站呈现这一块，3D 效果的比重将会持续增长。作为前端开发工作者，Web 图形学是值得学习与研究的。
