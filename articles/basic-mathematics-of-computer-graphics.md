---
title: "计算机图形学基础"
date: 2021-09-14 20:30:00 +0800
categories: [图形学]
tag: []
math: true
---

# 计算机图形学基础

## 二维变换

### 旋转

在二维 XY 坐标系中，向量`(x, y)`基于原点逆时针旋转 $\theta$ 角度至向量`(x', y')`，其*变换矩阵*为

$$
\begin{bmatrix}x' & y'\end{bmatrix} = \begin{bmatrix}x & y\end{bmatrix}\begin{bmatrix} cos\theta & sin\theta \\ -sin\theta & cos\theta \end{bmatrix}
$$

推导如下：

<div align=center>
<img src="/images/二维XY坐标系旋转.png" style="width: 60%" />
</div>

$$
x^2 + y^2 = x'^2 + y'^2
$$

$$
sin\alpha = { y \over { \sqrt { x^2 + y^2 } } }
\qquad
cos\alpha = { x \over { \sqrt { x^2 + y^2 } } }
$$

$$
\begin{split}
sin(\alpha + \theta) & = sin\alpha cos\theta + cos\alpha sin\theta
\\ & = cos\theta { y \over { \sqrt { x^2 + y^2 } } } + sin\alpha { x \over { \sqrt { x^2 + y^2 } } }
\\ & = { y' \over { \sqrt { x'^2 + y'^2 } } }
\end{split}
$$

$$
\begin{split}
&\Rightarrow
y' = x sin\theta + y cos\theta\\
&\Rightarrow
x' = x cos\theta - y sin\theta\\
&\Rightarrow
\begin{bmatrix}x' & y'\end{bmatrix} = \begin{bmatrix}x & y\end{bmatrix}\begin{bmatrix} cos\theta & sin\theta \\ -sin\theta & cos\theta \end{bmatrix}
\end{split}
$$

### 缩放

在二维 XY 坐标系中，向量`(x, y)`进行缩放`n`倍得到向量`(nx, ny)`，其*变换矩阵*为

$$
\begin{bmatrix} nx & ny \end{bmatrix}
=
\begin{bmatrix} x & y \end{bmatrix}
\begin{bmatrix} n & 0 \\ 0 & n \end{bmatrix}
$$

### 平移

在二维坐标系中，向量`(x, y)`进行平移得到`(x+m, y+n)`，需要引入*齐次坐标*得到变换矩阵，其变换矩阵为

$$
\begin{bmatrix} x+m & y+n & 1 \end{bmatrix}
=
\begin{bmatrix} x & y & 1 \end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
m & n & 1 \\
\end{bmatrix}
$$

### 线性变换

在二维 XY 坐标系中，向量的变换都可由旋转、缩放和平移进行线性组合变换，通过逆矩阵可以进行还原变换

$$
\begin{split}
T&=SM_1M_2...M_n
\\
S&=TM_n^{-1}M_{n-1}^{-1}...M_1^{-1}
\end{split}
$$

单位矩阵的逆矩阵为其转置矩阵

## 三维变换

> 将三维变换转换为二维变换

### 旋转

分别围绕 x/y/z 轴 旋转

- 绕 z 轴 旋转

$$
\begin{bmatrix}
x & y & z & 1
\end{bmatrix}
=
\begin{bmatrix}
x' & y' & z' & 1
\end{bmatrix}
\begin{bmatrix}
cos\theta & sin\theta & 0 & 0 \\
-sin\theta & cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

- 绕 x 轴 旋转

$$
\begin{bmatrix}
x & y & z & 1
\end{bmatrix}
=
\begin{bmatrix}
x' & y' & z' & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & cos\theta & sin\theta & 0 \\
0 & -sin\theta & cos\theta & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

- 绕 y 轴 旋转

$$
\begin{bmatrix}
x & y & z & 1
\end{bmatrix}
=
\begin{bmatrix}
x' & y' & z' & 1
\end{bmatrix}
\begin{bmatrix}
-sin\theta & 0 & cos\theta & 0 \\
0 & 1 & 0 & 0 \\
cos\theta & 0 & sin\theta & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

- 绕经过原点的直线旋转角度$\theta$，如图，旋转轴可通过*单位向量*获取相关值

<div align=center>
<img src="/images/三维XYZ坐标系旋转.png" style="width: 60%" />
</div>

1.将旋转轴 OA 旋转至 YOZ 平面内，即 OA 绕 y 轴 旋转角度 $\alpha$ ，变换矩阵如下

$$
R_y(\alpha)=
\begin{bmatrix}
-sin\alpha & 0 & cos\alpha & 0 \\
0 & 1 & 0 & 0 \\
cos\alpha & 0 & sin\alpha & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

2.将旋转轴 OA 旋转至 Z 轴上，即 OA 绕 x 轴 旋转角度 $\beta$ ，变换矩阵如下

$$
R_x(\beta)=
\begin{bmatrix}
cos\beta & sin\beta & 0 & 0 \\
-sin\beta & cos\beta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

3.物体绕 z 轴 旋转角度 $\theta$ ，变换矩阵如下

$$
R_z(\theta)=
\begin{bmatrix}
cos\theta & sin\theta & 0 & 0 \\
-sin\theta & cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

4.物体还原步骤 2 和步骤 1 的变换，即进行逆矩阵变换，所以最终变换矩阵如下

$$
\begin{split}
R(\theta)&=R_y(\alpha)R_x(\beta)R_z(\theta)R_x(-\beta)R_y(-\alpha)\\
&=R_y(\alpha)R_x(\beta)R_z(\theta)R_x^{-1}(\beta)R_y^{-1}(\alpha)\\
&=R_y(\alpha)R_x(\beta)R_z(\theta)R_x^T(\beta)R_y^T(\alpha)
\end{split}
$$

### 缩放

缩放变换矩阵如下

$$
Z(n)=
\begin{bmatrix}
n & 0 & 0 & 0\\
0 & n & 0 & 0\\
0 & 0 & n & 0\\
0 & 0 & 0 & 1
\end{bmatrix}
$$

### 平移

平移变换矩阵如下

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
