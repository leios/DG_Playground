var documenterSearchIndex = {"docs":
[{"location":"dg_methods/#Discontinuous-Galerkin-1","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"In CLIMA the Discontinuous Galerkin method serves as our spatial discretization method. It may be thought of as a combination of spectral methods and finite volume methods. The method is a higher-order generalization of a finite volume method.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Pages = [\"dg_methods.md\"]","category":"page"},{"location":"dg_methods/#Single-Element-Equation-1","page":"Discontinuous Galerkin","title":"Single Element Equation","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Our goal will be to understand the Discontinuous Galerkin (DG) discretization for a single element.  We will use this to illustrate the role of boundary fluxes but also to understand differences with finite volume codes. To better illustrate the discrete implementation of the weak formulation of the conservation equation, we consider the advection-diffusion equation","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    partial_t rho + partial_x left( u rho right) = partial_x sigma \n    sigma = partial_x rho\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"where u in mathbbR, the domain is x in (-1  1) equiv Omega = E, and rho(xt) and/or sigma(xt) satisfies some prescribed boundary conditions.","category":"page"},{"location":"dg_methods/#Weak-Form-1","page":"Discontinuous Galerkin","title":"Weak Form","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The weak form of the equations is obtained by multiplying through each equation by test functions psi(x) , varphi(x), integrating over the domain, and integrating by parts on the terms with derivatives, to obtain","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    partial_t int_E psi rho - int_E  (partial_x psi) (u rho) =\n    - int_E (partial_x psi) sigma\n    + int_partial E psi sigma - int_partial E  psi (u rho)\n    \n    int_E varphi sigma = - int_E (partial_x varphi) rho + int_partial E  varphi rho\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The terms on the boundary are interpreted as numerical fluxes, typically denoted by an asterisk as follows","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    partial_t int_E psi rho - int_E  (partial_x psi) (u rho) =\n    - int_E (partial_x psi) sigma\n    + int_partial E psi sigma^* - int_partial E  psi (u rho)^*\n    \n    int_E varphi sigma = - int_E (partial_x varphi) rho + int_partial E  varphi rho^*\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"This form is taken as the definition of our partial differential equation in weak form.","category":"page"},{"location":"dg_methods/#Discontinuous-Galerkin-Approximation-1","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin Approximation","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"In DG we approximate the spatial structure of our functions rho(xt) and sigma(xt) by a set of linearly independent polynomials, ell_i(x) for i = 0  N, within each element, so that","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    rho(xt) = rho_i(t) ell_i(x) text and  sigma(xt) = sigma_i(t) ell_i(x)\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"where we are using Einstein summation convention for repeated indices. To reduce notational clutter we will occasionally suppress the x-dependence and t-dependence in the following manner","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    rho = rho_i ell_i text and  sigma = sigma_i ell_i\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"We have 2(N+1) degrees of freedom (N+1 for rho_i and N+1 for sigma_i), thus we must specify 2(N+1) test functions for which we are satisfying the equation. In the Galerkin method we take the test functions to be the same as the basis in which we are representing our solution, i.e., psi = ell_i(x) for i = 0 N and varphi = ell_j(x) for j = 0  .","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"In index notation and with Einstein summation convection, equations become (basically just replacing psi = varphi = ell_i and rho = rho_j ell_j and sigma = sigma_j ell_j)","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    partial_t int_E ell_i ell_j rho_j - int_E  ell_i ell_j (u rho_j) =\n    - int_E ell_i ell_j sigma_j\n    + int_partial E ell_i sigma^* - int_partial E  ell_i  (u rho)^*\n    \n    int_E ell_i ell_j sigma_j = - int_E ell_i ell_j rho_j + int_partial E  ell_i rho^*\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"where we have introduced the prime notation to denote a derivative, e.g., ell_i denotes the derivative of ell_i. We see that a few operators come up over and over again, and they are given special names. The operator whose entries are given by","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM_ij = int_E ell_i ell_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"is known as the mass matrix, a name borrowed from the finite element community. The operator whose entries are given by","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS_ji = int_E ell_i ell_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"is known as the stiffness matrix a name also borrowed from the finite element community. The flipping of the indices on the entries of mathcalS is purposeful and corresponds to how it is \"usually\" defined.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The boundary operators become","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    int_partial E  ell_i rho^* = ell_i(1) rho^*(1) - ell_i(-1) rho^*(-1)\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"and similarly for the other terms. We are abbreviating rho^*(x = 1 t) as rho^*(1) and we will do so for other variables as well. The boundary terms play a pivotal role in how one formulates boundary conditions as well as how one couples multiple elements together.","category":"page"},{"location":"dg_methods/#Discrete-Equations-1","page":"Discontinuous Galerkin","title":"Discrete Equations","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Once we make choices for our functions ell_i(x) we can write a set of discrete equations that represent the Discontinuous Galerkin scheme. We choose the ell_i to be Lagrange interpolants of a set of nodal points x_j for j = 0  N.  Being a Lagrange interpolant, by definition, means that ell_i(x_j) = delta_ij where delta_ij is the Kronecker delta. The nodal points x_j are chosen as the extrema of Jacobi polynomials. These points are able to be efficiently calculated with either explicit formulas (as is the case with Chebyshev polynomials where x_j = cos(pi j  N) for j = 0  N) or by solving certain eigenvalue problems, as is the case for Legendre polynomials.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Regardless of the exact form, it is always the case that the endpoints are 1 and -1 for polynomial orders bigger than one. We will use the convention that x_0 = -1 and x_N = 1 here, but with Chebyshev extrema one usually takes the opposite ordering. For polynomial order zero we take x_0 = 0 and ell_0 = 1 in order to reduce back to a finite volume scheme. With this convention and the definition of our Lagrange interpolants, we have ell_i(-1) = delta_iN and ell_i(1) = delta_i0.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"With notation and conventions now established, the discrete equations are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    partial_t mathcalM_ij rho_j - mathcalS_ji (u rho_j) =\n    - mathcalS_ji sigma_j\n    + delta_iN sigma^*(1)\n    - delta_i0 sigma^*(-1)\n    - delta_iN (u rho)^*(1)\n    +  \n    delta_i0 (u rho)^*(-1)\n    \n    mathcalM_ij sigma_j = -  mathcalS_jirho_j\n    + delta_iN rho^*(1)\n    -\n    delta_i0 rho^*(-1)\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"We will explicitly calculate the mass and stiffness matrices in the following subsections.","category":"page"},{"location":"dg_methods/#Explicit-representations-1","page":"Discontinuous Galerkin","title":"Explicit representations","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"For polynomial order zero we can work out all the Lagrange interpolants, extrema points, mass matrices, and stiffness matrices, by hand easily. Firstly, note that the extrema points for polynomial order N=0 is x_0 = 0. Note that here we have x_0 = x_N since N = 0. The Lagrange interpolants are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    ell_0(x) = 1\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The mass and stiffness matrices are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM_00 = 2 text and  mathcalS_00 = 0\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Thus, polynomial order zero is equivalent to a finite volume scheme.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"For polynomial order one we can work out all the Lagrange interpolants, extrema points, mass matrices, and stiffness matrices, by hand without too much effort. Firstly, note that the extrema points for polynomial order N=1 is x_0 = -1 and x_1 = 1. The Lagrange interpolants are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    ell_0(x) = fracx - 1-2 text and  ell_1(x) = fracx + 12\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"To calculate the entries of the mass matrix, one needs to calculate","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM_ij = int_E ell_i ell_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"i.e.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM_00 = int_-1^1 left(fracx - 1-2right)^2 dx = 23 \n    mathcalM_01 = int_-1^1 fracx^2 - 1-4 dx = 13 \nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"By symmetry mathcalM_00 = mathcalM_11 and mathcalM_01 = mathcalM_10 so","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM =\n    frac13beginbmatrix\n    2  1 \n    1  2\n    endbmatrix\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The stiffness matrix is obtained similarly, we must calculate the entries","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS_ji = int_E ell_i ell_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"so","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS^T_00  = int_-1^1 frac-12left(fracx + 12 right) dx = -12\n    \n    mathcalS^T_01  = int_-1^1 frac-12left(fracx - 1-2 right) dx = -12\n    \n    mathcalS^T_10  = int_-1^1 frac12left(fracx - 1-2 right) dx = 12\n    \n    mathcalS^T_11  = int_-1^1 frac12left(fracx + 12 right) dx = 12\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"so that","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS^T = frac12 beginbmatrix\n        -1  -1 \n        1  1\n    endbmatrix\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Unlike polynomial order zero and finite volume schemes, all non-zero polynomial order DG discretizations have a non-zero stiffness matrix. Non-zero stiffness matrices play an important role in the determining the stability of the numerical discretization and adds extra complications that do not present themselves in the finite volume case.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Luckily this has been automated for any polynomial order, so we just display the results polynomial order two here. The extrema points are x_0 = -1, x_1 = 0, x_2 = 1. The Lagrange interpolants are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    ell_0(x) = x(x-1)2\n    text  \n    ell_1(x) = -(x+1)(x-1)\n    text  and \n    ell_2(x) = x(x+1)  2\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The mass and stiffness matrices are","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalM = frac115\n    beginbmatrix\n      4   2  -1 \n  2   16    2 \n -1   2   4\n    endbmatrix\n    text and \n    mathcalS^T =\n    frac16\n    beginbmatrix\n -3   -4   1 \n  4   0   -4 \n -1   4   3 \n    endbmatrix\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"In DG_Playground we can extract these matrices as follows","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"using DG_Playground\nn = 2;\nα = β = 0.0;\nr = jacobiGL(α, β, n);\nD = dmatrix(r, α, β, n);\nV = vandermonde(r, α, β, n);\nMi = V * V';\nM = inv(Mi)\nSᵀ  = (M * D)'","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"where n is the polynomial order, M is the mass matrix and S^T is the transpose of the stiffness matrix, and alpha and beta are the exponents in the weights of the (Jacobi Polynomials](https://en.wikipedia.org/wiki/Jacobi_polynomials).","category":"page"},{"location":"dg_methods/#Algebraic-Properties-of-Operators-1","page":"Discontinuous Galerkin","title":"Algebraic Properties of Operators","text":"","category":"section"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"We have seen some properties in the previous sections that are particular realizations of more algebraic properties of DG operators. Here we will collect \\textbf{three} such algebraic properties.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The first is that","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    int_E rho^2 = rho_i mathcalM_ij rho_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The proof is a one liner since rho = rho_i ell_i and int_E  (ell_i ell_j ) = mathcalM_ij. The calculation is as follows","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n  int_E rho^2  = int_E (rho_i ell_i) (rho_j ell_j ) =  rho_i int_E  (ell_i ell_j ) rho_j = rho_i mathcalM_ij rho_j\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"Furthermore, observe that that the mass matrix is symmetric, i.e., mathcalM_ij = mathcalM_ji.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"The next property is the \\textbf{discrete integration by parts} formula","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS_ji + mathcalS_ij = delta_iNdelta_jN - delta_i0delta_j1\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"This follows from","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n   mathcalS_ji + mathcalS_ij = int_E ell_i ell_j + int_E ell_j ell_i = int_partial E  ell_j ell_i = ell_j(1) ell_i(1) - ell_j(-1) ell_i(-1)\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"via integration by parts, the definition of the Lagrange interpolant, and our convention that ell_i(1) = delta_iN and ell_i(-1) = delta_i0.","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"This last algebraic property follows from the previous","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    rho_i mathcalS_ji rho_j = frac12 left (rho_N)^2 - (rho_0)^2 right\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"To see this write","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"beginaligned\n    mathcalS_ji = frac12left(mathcalS_ji + mathcalS_ij right) + frac12left(mathcalS_ji - mathcalS_ij right)\nendaligned","category":"page"},{"location":"dg_methods/#","page":"Discontinuous Galerkin","title":"Discontinuous Galerkin","text":"and use the fact that the anti-symmetric component vanishes rho_ileft(mathcalS_ji - mathcalS_ij right) rho_j = 0","category":"page"},{"location":"convective_adjustment/#Convective-Adjustment-1","page":"Convective Adjustment","title":"Convective Adjustment","text":"","category":"section"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"Convective adjustment is a simple parameterization that attempts the capture the effect of mixing due to convection. Physically this occurs because dense water parcels tend to sink and and light water parcels tend to rise.","category":"page"},{"location":"convective_adjustment/#Mathematical-Form-1","page":"Convective Adjustment","title":"Mathematical Form","text":"","category":"section"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"Typically the effect of convective adjustment is captured via a nonlinear diffusivity such as","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"beginaligned\nkappa(rho) = begincases\nkappa_1  text if text   partial_z rho  0\n\nkappa_2  text otherwise\nendcases\nendaligned","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"where kappa_1 gg kappa_2, and z is aligned with the direction of gravity. Thinking of $ \\rho $ as density, a simple parameterization of convection is of the form","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"beginaligned\npartial_t rho = nabla cdot left kappa(rho) nabla rho right\nendaligned","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"Intuitively, the above nonlinear diffusivity models the effect of mixing when heavy fluid parcels overlie light fluid parcels. Here the  mixing is modeled via diffusion with a large diffusivity constant. This is by no means the only way to model the effect of mixing, but it is a starting point.","category":"page"},{"location":"convective_adjustment/#Typical-Time-Discretization-1","page":"Convective Adjustment","title":"Typical Time-Discretization","text":"","category":"section"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"A typical time-discretization would be","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"beginaligned\nrho^n+1 - Delta t partial_z left kappa(rho^n) partial_z rho^n+1 right = rho^n + Delta t left( f^n + nabla^H cdot left kappa(rho^n) nabla^H rho^n right right)\nendaligned","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"where the forcing function f^n comes from boundary condition and we have split the gradient operator into the vertically aligned component z and the other (horizontal) directions. When discretized, the time-stepping method yields a Helmholtz-like problem that needs to be solved every timestep. The reason why it is not exactly a Helmholtz-like problem is due to the use of inexact quadrature for variable diffusivity. In this context, inexact quadrature means that, instead of projecting nonlinear terms onto the appropriate basis, we multiply them together at the collocation points.","category":"page"},{"location":"convective_adjustment/#Simplification-1","page":"Convective Adjustment","title":"Simplification","text":"","category":"section"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"There are a wide variety of functional forms that kappa(rho^n) can take on, but typically it is similar to","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"beginaligned\n    kappa(rho^n) approx\n    begincases\n    kappa_1  text if  z  h \n    kappa_2  text if  z leq h\n    endcases\nendaligned","category":"page"},{"location":"convective_adjustment/#","page":"Convective Adjustment","title":"Convective Adjustment","text":"where z in 0 L and h can take on all values between 0 L and varies depending on the horizontal components. The reason why there is usually just one place that kappa changes values of diffusivity has to do with typical physical scenarios that arise in the ocean / atmosphere. The ocean interior is stably stratified. Cooling comes from the surface of the ocean and leads to mixing that starts in the upper ocean and progresses towards the ocean abyss. The solution to linear systems of this form (when Delta t becomes large), is essentially constant in the region of high diffusivity.","category":"page"},{"location":"function_index/#List-of-functions-in-DG_Playground-module-1","page":"Function Index","title":"List of functions in DG_Playground module","text":"","category":"section"},{"location":"function_index/#","page":"Function Index","title":"Function Index","text":"Modules = [DG_Playground]","category":"page"},{"location":"function_index/#DG_Playground.Field1D","page":"Function Index","title":"DG_Playground.Field1D","text":"Field1D(mesh)\n\nDescription\n\ninitialize Field1D struct\n\nArguments\n\nmesh: a mesh to compute on\n\nReturn Values:\n\nu : the field to be computed\nu̇: numerical solutions for the field\nflux: the numerical flux for the computation\n\n\n\n\n\n","category":"type"},{"location":"function_index/#DG_Playground.Mesh-NTuple{4,Any}","page":"Function Index","title":"DG_Playground.Mesh","text":"mesh(K, n, xmin, xmax)\n\nDescription\n\nouter_constructor mesh struct\n\nArguments\n\nK: number of elements\nn: polynomial order\nxmin: lower bound\nxmax: upper bound\n\nReturn Values: x\n\nreturn grid values\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.build_operator-Tuple{Any,Mesh}","page":"Function Index","title":"DG_Playground.build_operator","text":"buildoperator(affineoperator!, 𝒢::Mesh; mass_matrix = false)\n\nDescription\n\nbuilds affine operator associated with DG operator\n\nComment\n\nWith non-homogenous boundary conditions becomes affine\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.dmatrix-NTuple{4,Any}","page":"Function Index","title":"DG_Playground.dmatrix","text":"dmatrix(x, α, β, N)\n\nDescription\n\nReturn the differentiation matrix of order N at the values x\nAllocates too much memory\n\nArguments\n\nx: points at which to evaluate the Jacobi polynomials\nα: first parameter for Jacobi polynomials\nβ: second paramater for Jacobi polynomials\nN: maximum order of Jacobi polynomial to include\n\nReturn Values\n\nD: the differentiation matrix\n\nExample\n\nSee LegendreTests.jl\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.jacobiGL-Tuple{Any,Any,Any}","page":"Function Index","title":"DG_Playground.jacobiGL","text":"jacobiGL(α, β, N)\n\nDescription\n\nGuass Labatto quadrature points for the Jacobi Polynomial (α,β)\nThe quadrature weights are computed as well (but not returned)\n\nArguments\n\nα, β: Jacobi polynomial descriptors\nN:    order of quadrature\n\nReturn: x\n\nx: quadrature points  | array of size N+1\n\nExamples\n\njulia> x = jacobiGL(0, 0, 4)\n5-element Array{Float64,1}:\n -1.0\n -0.6546536707079759\n  4.440892098500626e-16\n  0.6546536707079771\n  1.0\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.lift1D-Tuple{Any}","page":"Function Index","title":"DG_Playground.lift1D","text":"lift1D(V, y) for computing fluxes helps compute a surface integral of a quantity note that the parentheses are necessary to prevent too much multiplcation the E function takes the surface integrals are presents it with respect to the full space inside an element the entire operator represents how fluxes flow into the interior of an element\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.vandermonde-NTuple{4,Any}","page":"Function Index","title":"DG_Playground.vandermonde","text":"vandermonde(x, α, β, N)\n\nDescription\n\nReturn vandermonde matrix of order N at the values x\nAllocates a little bit of memory\n\nArguments\n\nx: points at which to evaluate the Jacobi polynomials\nα: first parameter for Jacobi polynomials\nβ: second parameter for Jacobi polynomials\nN: maximum order of Jacobi polynomial to include\n\nReturn Values\n\nv: vandermonde matrix\n\nExample\n\nSee LegendreTests.jl\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.external_params","page":"Function Index","title":"DG_Playground.external_params","text":"external_params{T,S}\n\nDescription\n\nstruct for external params needed for advection\n\nMembers\n\nfirst is velocity\nsecond is value for α\n\n\n\n\n\n","category":"type"},{"location":"function_index/#DG_Playground.buildmaps1D-NTuple{8,Any}","page":"Function Index","title":"DG_Playground.buildmaps1D","text":"buildmaps1D(K, nGL, nFP, nFaces, fmask, EtoE, EtoF, x)\n\nDescription\n\nconnectivity matrices for element to elements and elements to face\n\nArguments\n\nK: number of elements\nnGL: number of points within an element (polynomial degree + 1)\nnFP: 1\nnFaces: 2\nfmask: an element by element mask to extract edge values\nEtoE: element to element connectivity\nEtoF: element to face connectivity\nx: Guass lobatto points\n\nReturn Values: vmapM, vmapP, vmapB, mapB, mapI, mapO, vmapI, vmapO\n\nvmapM: vertex indices, (used for interior u values)\nvmapP: vertex indices, (used for exterior u values)\nvmapB: vertex indices, corresponding to boundaries\nmapB: use to extract vmapB from vmapM\nmapI: Index of left boundary condition\nmapO: Index of right boundary condition\n\nExample | uses ../utils.jl\n\nK = 3 n = 3; α = 0; β = 0; xmin = 0; xmax = 2π; nGL = n + 1 nFP = 1 nFaces = 2\n\nr = jacobiGL(α, β, n)\n\nVX, EtoV = unimesh1D(xmin, xmax, K) EtoE, EtoF = connect1D(EtoV) x = gridvalues1D(VX, EtoV, r) fx = edgevalues1D(r,x)\n\nvmapM, vmapP, vmapB, mapB, mapI, mapO, vmapI, vmapO = buildmaps1D(K, nGL, nFP, nFaces, fmask, EtoE, EtoF, x)\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.connect1D-Tuple{Any}","page":"Function Index","title":"DG_Playground.connect1D","text":"connect1D(EtoV)\n\nDescription\n\nbuilds global connectivity arrays for 1D\n\nArguments\n\nEtoV: element to node connectivity | a Matrix of size Kx2\n\nReturn Values: EtoE, EtoF\n\nEtoE: element to element connectivity\nEtoF: element to face connectivity\n\nExample\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.djacobi-Tuple{Any,Any,Any,Int64}","page":"Function Index","title":"DG_Playground.djacobi","text":"djacobi(x, α, β, n)\n\nDescription\n\nEvaluates the derivative of the jacobi polynomial at the point x\n\nArguments\n\nx: point at which you will evaluate the derivative of the jacobi polynomial\nα: first parameter for Jacobi polynomials\nβ: second parameter for Jacobi polynomials\nn : order\n\nReturn\n\ny: the derivative of the of the Jacobi polynomial\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.dropϵzeros!-Tuple{Any,Any}","page":"Function Index","title":"DG_Playground.dropϵzeros!","text":"dropϵzeros!(sparseMatrix, drop_criteria)\n\nDescription\n\nDrops machine zeros in sparse matrix\n\nArguments\n\nA: a sparse matrix\ndrop_criteria: criteria for dropping entries\n\nreturn\n\nnothing\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.dropϵzeros!-Tuple{Any}","page":"Function Index","title":"DG_Playground.dropϵzeros!","text":"dropϵzeros!(sparseMatrix)\n\nDescription\n\nDrops machine zeros in sparse matrix\n\nArguments\n\n!A: a sparse matrix\n\nreturn\n\nnothing\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.dvandermonde-NTuple{4,Any}","page":"Function Index","title":"DG_Playground.dvandermonde","text":"dvandermonde(x, α, β, N)\n\nDescription\n\nReturn the gradient of the vandermonde matrix of order N at the values x\nAllocates a little bit of memory\n\nArguments\n\nx: points at which to evaluate the Jacobi polynomials\nα: first parameter for Jacobi polynomials\nβ: second paramater for Jacobi polynomials\nN: maximum order of Jacobi polynomial to include\n\nReturn Values\n\nvr: gradient of vandermonde matrix\n\nExample\n\nSee LegendreTests.jl\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.edgevalues1D-Tuple{Any,Any}","page":"Function Index","title":"DG_Playground.edgevalues1D","text":"edgevalues1D(fmask, x)\n\nDescription\n\ncalculates edge values\n\nArguments\n\nfmask: face mask for GL edges\n\nx:  physical coordinates of solution on each element\n\nReturn Values: x\n\nfx: face values of x\n\nExample | ../utils.jl\n\nr = jacobiGL(0, 0, 4) x = gridvalues1D(VX, EtoV, r) fmask = fmask1D(r)[1] fx = edgevalues1D(fmask,x)\n\nthe locations of the edges in element 1 is fx[:, 1]\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.fmask1D-Tuple{Any}","page":"Function Index","title":"DG_Playground.fmask1D","text":"facemask1D(r)\n\nDescription\n\ncreates face mask\n\nArguments\n\nr: GL points\n\nReturn Values: x\n\nfmask1: standard facemask\nfmask2: alternate form\n\nExample | ../utils.jl\n\nr = jacobiGL(0, 0, 4) fmask = fmask1D(r)\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.geometric_factors-Tuple{Any,Any}","page":"Function Index","title":"DG_Playground.geometric_factors","text":"geometric_factors(x, Dʳ)\n\nDescription\n\ncomputes the geometric factors for local mappings of 1D elements\n\nArguments\n\nx: physical coordinates of solution for each element\n\nDʳ:\n\nReturn Values: rx, J\n\nrx: inverse jacobian\n\nJ: jacobian (in 1D a scalar)\n\nExample\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.gridvalues1D-Tuple{Any,Any,Any}","page":"Function Index","title":"DG_Playground.gridvalues1D","text":"gridvalues1D(xmin, xmax, K)\n\nDescription\n\nGenerates physical gridpoints with each element\n\nArguments\n\nVX: vertex values | an Array of size K+1\n\nEtoV: element to node connectivity | a Matrix of size Kx2\n\nr: LGL nodes in reference element | an array\n\nReturn Values: x\n\nx: physical coordinates of solution\n\nExample (uses ../utils.jl as well)\n\nxmin = 0 xmax = 2π K = 4\n\ncall functions\n\nVX, EtoV = unimesh1D(xmin, xmax, K) r = jacobiGL(0, 0, 4) x = gridvalues1D(VX, EtoV, r)\n\nx[:,1] is the physical coordinates within the first element\n\nfor plotting\n\nf(x) = sin(x) plot(x, f.(x))\n\nscatter(x,f.(x)) tends to work better\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.jacobi-Tuple{Any,Any,Any,Int64}","page":"Function Index","title":"DG_Playground.jacobi","text":"jacobi(x, α, β, n)\n\nDescription\n\nEvaluates the jacobi polynomial at the point x\n\nArguments\n\nx: point at which you will evaluate the jacobi polynomial\nα: first parameter for Jacobi polynomials\nβ: second parameter for Jacobi polynomials\nn : order\n\nReturn\n\ny: the value of the of the Jacobi polynomial\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.jacobiGQ-Tuple{Any,Any,Any}","page":"Function Index","title":"DG_Playground.jacobiGQ","text":"jacobiGQ(α, β, N)\n\nDescription\n\nGuass Quadrature points and weights for the Jacobi Polynomial (α,β)\n\nInput\n\nα, β: Jacobi polynomial descriptors N:    order of quadrature points\n\nReturn: x,w\n\nx: quadrature points | array of size N+1 w: quadrature weights | array of size N+1 #Example α = 0 β = 0 N = 4 x, w = jacobiGQ(α, β, N)\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.lift1D_v2-Tuple{Any}","page":"Function Index","title":"DG_Playground.lift1D_v2","text":"lift1D_v2(V, y) for computing fluxes nodal form helps compute a surface integral of a quantity note that the parantheses are necessary to prevent too much multiplcation the E function takes the surface integrals are presents it with respect to the full space inside an element the entire operator represents how fluxes flow into the interior of an element\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.make_periodic1D!-Tuple{Any,Any}","page":"Function Index","title":"DG_Playground.make_periodic1D!","text":"make_periodic1D!(vmapP, u)\n\nDescription\n\nmakes the grid periodic by modifying vmapP.\nAssumes that the first node is connected to the last.\n\nArguments\n\nvmapP: exterior vertex map\nu: vertex vector\n\nReturn Values: none\n\nExample\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.normals1D-Tuple{Any}","page":"Function Index","title":"DG_Playground.normals1D","text":"normals1D(K)\n\nDescription\n\ncalculates face normals\n\nArguments\n\nK: number of elements\n\nReturn Values: normals\n\nnormals: face normals along each grid\n\nExample\n\n\n\n\n\n","category":"method"},{"location":"function_index/#DG_Playground.unimesh1D-Tuple{Any,Any,Any}","page":"Function Index","title":"DG_Playground.unimesh1D","text":"unimesh1D(xmin, xmax, K)\n\nDescription\n\nGenerates a uniform 1D mesh\n\nArguments\n\nxmin: smallest value of array\nxmax: largest values of array\nK: number of elements in an array\n\nReturn Values: VX, EtoV\n\nVX: vertex values | an Array of size K+1\nEtoV: element to node connectivity | a Matrix of size Kx2\n\nExample\n\nxmin = -1 xmax =  1 K    =  4 VX, EtoV = unimesh1D(xmin, xmax, K)\n\n\n\n\n\n","category":"method"},{"location":"#DG_Playground-1","page":"Home","title":"DG_Playground","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A repository for quickly prototyping ideas ideas for the CLIMA project. The main objectives are to","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Test / develop relevant preconditioners\nCreate useful abstractions for timestepping and DG operators","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The core DG algorithm being used here is based on the textbook by Hesthaven and Warburton.","category":"page"}]
}
