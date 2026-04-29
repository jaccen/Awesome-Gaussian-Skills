
================================================================================
CATEGORY: 2DGS (8 papers)
================================================================================

- Title: MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian Splatting
  Authors: Hanzhi Chang, Ruijie Zhu, Wenjie Chang, Mulin Yu, Yanzhe Liang, Jiahao Lu, Zhuoyuan Li, Tianzhu Zhang
  Year: 2025
  ArXiv: 2508.17811
  Project: https://hanzhichang.github.io/meshsplat_web/
  Tags: Feed-Forward, Meshing
  Key: Surface reconstruction has been widely studied in computer vision and graphics. However, existing surface reconstruction works struggle to recover accurate scene geometry when the input views are extr

- Title: Gaussian Billboards: Expressive 2D Gaussian Splatting with Textures
  Authors: Sebastian Weiss, Derek Bradley
  Year: 2024
  ArXiv: 2412.12734
  Tags: Texturing
  Key: Gaussian Splatting has recently emerged as the go-to representation for reconstructing and rendering 3D scenes. The transition from 3D to 2D Gaussian primitives has further improved multi-view consist

- Title: HDGS: Textured 2D Gaussian Splatting for Enhanced Scene Rendering
  Authors: Yunzhou Song, Heguang Lin, Jiahui Lei, Lingjie Liu, Kostas Daniilidis
  Year: 2024
  ArXiv: 2412.01823
  Tags: Antialiasing, Meshing
  Key: Recent advancements in neural rendering, particularly 2D Gaussian Splatting (2DGS), have shown promising results for jointly reconstructing fine appearance and geometry by leveraging 2D Gaussian surfe

- Title: Trim 3D Gaussian Splatting for Accurate Geometry Representation
  Authors: Lue Fan, Yuxue Yang, Minxing Li, Hongsheng Li, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2406.07499
  Code: https://github.com/YuxueYang1204/TrimGS
  Project: https://trimgs.github.io/
  Tags: Densification
  Key: In this paper, we introduce Trim 3D Gaussian Splatting (TrimGS) to reconstruct accurate 3D geometry from images. Previous arts for geometry reconstruction from 3D Gaussians mainly focus on exploring s

- Title: Vidu4D: Single Generated Video to High-Fidelity 4D Reconstruction with Dynamic Gaussian Surfels
  Authors: Yikai Wang, Xinzhou Wang, Zilong Chen, Zhengyi Wang, Fuchun Sun, Jun Zhu
  Year: 2024
  ArXiv: 2405.16822
  Code: https://github.com/yikaiw/vidu4d
  Project: https://vidu4d-dgs.github.io/
  Tags: Dynamic
  Key: Video generative models are receiving particular attention given their ability to generate realistic and imaginative frames. Besides, these models are also observed to exhibit strong 3D consistency, s

- Title: GS2Mesh: Surface Reconstruction from Gaussian Splatting via Novel Stereo Views
  Authors: Yaniv Wolf, Amit Bracha, Ron Kimmel
  Year: 2024
  ArXiv: 2404.01810
  Code: https://github.com/yanivw12/gs2mesh
  Project: https://gs2mesh.github.io//
  Tags: Meshing, Stereo
  Key: Recently, 3D Gaussian Splatting (3DGS) has emerged as an efficient approach for accurately representing scenes. However, despite its superior novel view synthesis capabilities, extracting the geometry

- Title: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
  Authors: Binbin Huang, Zehao Yu, Anpei Chen, Andreas Geiger, Shenghua Gao
  Year: 2024
  ArXiv: 2403.17888
  Code: https://github.com/hbb1/2d-gaussian-splatting
  Project: https://surfsplatting.github.io/
  Tags: Meshing
  Key: 3D Gaussian Splatting (3DGS) has recently revolutionized radiance field reconstruction, achieving high quality novel view synthesis and fast rendering speed without baking. However, 3DGS fails to accu

- Title: GaussianImage: 1000 FPS Image Representation and Compression by 2D Gaussian Splatting
  Authors: Xinjie Zhang, Xingtong Ge, Tongda Xu, Dailan He, Yan Wang, Hongwei Qin, Guo Lu, Jing Geng, Jun Zhang
  Year: 2024
  ArXiv: 2403.08551
  Code: https://github.com/Xinjie-Q/GaussianImage
  Project: https://xingtongge.github.io/GaussianImage-page/
  Tags: Compression
  Key: Implicit neural representations (INRs) recently achieved great success in image representation and compression, offering high visual quality and fast rendering speeds with 10-1000 FPS, assuming suffic

================================================================================
CATEGORY: 360 degree (6 papers)
================================================================================

- Title: Zero-Shot Novel View and Depth Synthesis with Multi-View Geometric Diffusion
  Authors: Vitor Guizilini, Muhammad Zubair Irshad, Dian Chen, Greg Shakhnarovich, Rares Ambrus
  Year: 2025
  ArXiv: 2501.18804
  Project: https://mvgd.github.io/
  Tags: Diffusion, Feed-Forward, Large-Scale, Point Cloud
  Key: Current methods for 3D scene reconstruction from sparse posed images employ intermediate 3D representations such as neural fields, voxel grids, or 3D Gaussians, to achieve multi-view consistent scene

- Title: PanSplat: 4K Panorama Synthesis with Feed-Forward Gaussian Splatting
  Authors: Cheng Zhang, Haofei Xu, Qianyi Wu, Camilo Cruz Gambardella, Dinh Phung, Jianfei Cai
  Year: 2024
  ArXiv: 2412.12096
  Code: https://github.com/chengzhag/PanSplat
  Project: https://chengzhag.github.io/publication/pansplat/
  Tags: Feed-Forward, World Generation
  Key: With the advent of portable 360{\deg} cameras, panorama has gained significant attention in applications like virtual reality (VR), virtual tours, robotics, and autonomous driving. As a result, wide-b

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Ray Tracing, Relight, Rendering, Antialiasing, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: OmniGS: Omnidirectional Gaussian Splatting for Fast Radiance Field Reconstruction using Omnidirectional Images
  Authors: Jiarui Meng, Haijie Li, Yanmin Wu, Qiankun Gao, Shuzhou Yang, Jian Zhang, Siwei Ma
  Year: 2024
  ArXiv: 2404.03202
  Project: https://liquorleaf.github.io/research/OmniGS/
  Tags: Rendering
  Key: Photorealistic reconstruction relying on 3D Gaussian Splatting has shown promising potential in robotics. However, the current 3D Gaussian Splatting system only supports radiance field reconstruction

- Title: 360-GS: Layout-guided Panoramic Gaussian Splatting For Indoor Roaming
  Authors: Letian Huang, Jiayang Bai, Jie Guo, Yanwen Guo
  Year: 2024
  ArXiv: 2402.00763
  Code: https://github.com/LeoDarcy/360GS
  Tags: Rendering
  Key: 3D Gaussian Splatting (3D-GS) has recently attracted great attention with real-time and photo-realistic renderings. This technique typically takes perspective images as input and optimizes a set of 3D

- Title: SparseGS: Real-Time 360° Sparse View Synthesis using Gaussian Splatting
  Authors: Haolin Xiong, Sairisheek Muttukuru, Rishi Upadhyay, Pradyumna Chari, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.00206
  Code: https://github.com/ForMyCat/SparseGS
  Project: https://formycat.github.io/SparseGS-Real-Time-360-Sparse-View-Synthesis-using-Gaussian-Splatting/
  Tags: Sparse
  Key: The problem of novel view synthesis has grown significantly in popularity recently with the introduction of Neural Radiance Fields (NeRFs) and other implicit scene representation methods. A recent adv

================================================================================
CATEGORY: 3ster-based (11 papers)
================================================================================

- Title: Fast3R: Towards 3D Reconstruction of 1000+ Images in One Forward Pass
  Authors: Jianing Yang, Alexander Sax, Kevin J. Liang, Mikael Henaff, Hao Tang, Ang Cao, Joyce Chai, Franziska Meier, Matt Feiszli
  Year: 2025
  ArXiv: 2501.13928
  Project: https://fast3r-3d.github.io/
  Key: Multi-view 3D reconstruction remains a core challenge in computer vision, particularly in applications requiring accurate and scalable representations across diverse perspectives. Current leading meth

- Title: MEt3R: Measuring Multi-View Consistency in Generated Images
  Authors: Mohammad Asim, Christopher Wewer, Thomas Wimmer, Bernt Schiele, Jan Eric Lenssen
  Year: 2025
  ArXiv: 2501.06336
  Code: https://github.com/mohammadasim98/MEt3R
  Project: https://geometric-rl.mpi-inf.mpg.de/met3r/
  Tags: Diffusion
  Key: We introduce MEt3R, a metric for multi-view consistency in generated images. Large-scale generative models for multi-view image generation are rapidly advancing the field of 3D inference from sparse o

- Title: EasySplat: View-Adaptive Learning makes 3D Gaussian Splatting Easy
  Authors: Ao Gao, Luosong Guo, Tao Chen, Zhao Wang, Ying Tai, Jian Yang, Zhenyu Zhang
  Year: 2025
  ArXiv: 2501.01003
  Tags: Acceleration, Densification, Rendering
  Key: 3D Gaussian Splatting (3DGS) techniques have achieved satisfactory 3D scene representation. Despite their impressive performance, they confront challenges due to the limitation of structure-from-motio

- Title: MASt3R-SLAM: Real-Time Dense SLAM with 3D Reconstruction Priors
  Authors: Riku Murai, Eric Dexheimer, Andrew J. Davison
  Year: 2024
  ArXiv: 2412.12392
  Tags: SLAM
  Key: We present a real-time monocular dense SLAM system designed bottom-up from MASt3R, a two-view 3D reconstruction and matching prior. Equipped with this strong prior, our system is robust on in-the-wild

- Title: SLAM3R: Real-Time Dense Scene Reconstruction from Monocular RGB Videos
  Authors: Yuzheng Liu, Siyan Dong, Shuzhe Wang, Yanchao Yang, Qingnan Fan, Baoquan Chen
  Year: 2024
  ArXiv: 2412.09401
  Code: https://github.com/PKU-VCL-3DV/SLAM3R
  Tags: SLAM
  Key: In this paper, we introduce SLAM3R, a novel and effective monocular RGB SLAM system for real-time and high-quality dense 3D reconstruction. SLAM3R provides an end-to-end solution by seamlessly integra

- Title: MV-DUSt3R+: Single-Stage Scene Reconstruction from Sparse Views In 2 Seconds
  Authors: Zhenggang Tang, Yuchen Fan, Dilin Wang, Hongyu Xu, Rakesh Ranjan, Alexander Schwing, Zhicheng Yan
  Year: 2024
  ArXiv: 2412.06974
  Code: https://github.com/facebookresearch/mvdust3r
  Project: https://mv-dust3rp.github.io/
  Tags: Sparse
  Key: Recent sparse multi-view scene reconstruction advances like DUSt3R and MASt3R no longer require camera calibration and camera pose estimation. However, they only process a pair of views at a time to i

- Title: SPARS3R: Semantic Prior Alignment and Regularization for Sparse 3D Reconstruction
  Authors: Yutao Tang, Yuxiang Guo, Deming Li, Cheng Peng
  Year: 2024
  ArXiv: 2411.12592
  Tags: Poses, Sparse
  Key: Recent efforts in Gaussian-Splat-based Novel View Synthesis can achieve photorealistic rendering; however, such capability is limited in sparse-view scenarios due to sparse initialization and over-fit

- Title: MonST3R: A Simple Approach for Estimating Geometry in the Presence of Motion
  Authors: Junyi Zhang, Charles Herrmann, Junhwa Hur, Varun Jampani, Trevor Darrell, Forrester Cole, Deqing Sun, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2410.03825
  Code: https://github.com/Junyi42/monst3r
  Project: https://monst3r-project.github.io/
  Tags: Dynamic, Sparse
  Key: Estimating geometry from dynamic scenes, where objects move and deform over time, remains a core challenge in computer vision. Current approaches often rely on multi-stage pipelines or global optimiza

- Title: 3D Reconstruction with Spatial Memory
  Authors: Hengyi Wang, Lourdes Agapito
  Year: 2024
  ArXiv: 2408.16061
  Code: https://github.com/HengyiWang/spann3r
  Project: https://hengyiwang.github.io/projects/spanner
  Tags: SLAM
  Key: We present Spann3R, a novel approach for dense 3D reconstruction from ordered or unordered image collections. Built on the DUSt3R paradigm, Spann3R uses a transformer-based architecture to directly re

- Title: Splatt3R: Zero-shot Gaussian Splatting from Uncalibrated Image Pairs
  Authors: Brandon Smart, Chuanxia Zheng, Iro Laina, Victor Adrian Prisacariu
  Year: 2024
  ArXiv: 2408.13912
  Code: https://github.com/btsmart/splatt3r
  Project: https://splatt3r.active.vision/
  Tags: Rendering
  Key: In this paper, we introduce Splatt3R, a pose-free, feed-forward method for in-the-wild 3D reconstruction and novel view synthesis from stereo pairs. Given uncalibrated natural images, Splatt3R can pre

- Title: DUSt3R: Geometric 3D Vision Made Easy
  Authors: Shuzhe Wang, Vincent Leroy, Yohann Cabon, Boris Chidlovskii, Jerome Revaud
  Year: 2023
  ArXiv: 2312.14132
  Code: https://github.com/naver/dust3r
  Project: https://europe.naverlabs.com/research/publications/dust3r-geometric-3d-vision-made-easy/
  Key: Multi-view stereo reconstruction (MVS) in the wild requires to first estimate the camera parameters e.g. intrinsic and extrinsic parameters. These are usually tedious and cumbersome to obtain, yet the

================================================================================
CATEGORY: Acceleration (22 papers)
================================================================================

- Title: FastGS: Training 3D Gaussian Splatting in 100 Seconds
  Authors: Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu
  Year: 2025
  ArXiv: 2511.04283
  Code: https://github.com/fastgs/FastGS
  Project: https://fastgs.github.io/
  Tags: Densification, Dynamic, Sparse
  Key: The dominant 3D Gaussian splatting (3DGS) acceleration methods fail to properly regulate the number of Gaussians during training, causing redundant computational time overhead. In this paper, we propo

- Title: Trick-GS: A Balanced Bag of Tricks for Efficient Gaussian Splatting
  Authors: Anil Armagan, Albert Saà-Garriga, Bruno Manganelli, Mateusz Nowak, Mehmet Kerim Yucel
  Year: 2025
  ArXiv: 2501.14534
  Key: Gaussian splatting (GS) for 3D reconstruction has become quite popular due to their fast training, inference speeds and high quality reconstruction. However, GS-based reconstructions generally consist

- Title: VideoLifter: Lifting Videos to 3D with Fast Hierarchical Stereo Alignment
  Authors: Wenyan Cong, Kevin Wang, Jiahui Lei, Colton Stearns, Yuanhao Cai, Dilin Wang, Rakesh Ranjan, Matt Feiszli, Leonidas Guibas, Zhangyang Wang, Weiyao Wang, Zhiwen Fan
  Year: 2025
  ArXiv: 2501.01949
  Code: https://github.com/VITA-Group/VideoLifter
  Project: https://videolifter.github.io/
  Tags: Diffusion
  Key: Efficiently reconstructing accurate 3D models from monocular video is a key challenge in computer vision, critical for advancing applications in virtual reality, robotics, and scene understanding. Exi

- Title: EasySplat: View-Adaptive Learning makes 3D Gaussian Splatting Easy
  Authors: Ao Gao, Luosong Guo, Tao Chen, Zhao Wang, Ying Tai, Jian Yang, Zhenyu Zhang
  Year: 2025
  ArXiv: 2501.01003
  Tags: 3ster-based, Densification, Rendering
  Key: 3D Gaussian Splatting (3DGS) techniques have achieved satisfactory 3D scene representation. Despite their impressive performance, they confront challenges due to the limitation of structure-from-motio

- Title: SG-Splatting: Accelerating 3D Gaussian Splatting with Spherical Gaussians
  Authors: Yiwen Wang, Siyuan Chen, Ran Yi
  Year: 2024
  ArXiv: 2501.00342
  Key: 3D Gaussian Splatting is emerging as a state-of-the-art technique in novel view synthesis, recognized for its impressive balance between visual quality, speed, and rendering efficiency. However, relia

- Title: Balanced 3DGS: Gaussian-wise Parallelism Rendering with Fine-Grained Tiling
  Authors: Hao Gui, Lin Hu, Rui Chen, Mingxiao Huang, Yuxin Yin, Jin Yang, Yong Wu
  Year: 2024
  ArXiv: 2412.17378
  Key: 3D Gaussian Splatting (3DGS) is increasingly attracting attention in both academia and industry owing to its superior visual quality and rendering speed. However, training a 3DGS model remains a time-

- Title: Turbo-GS: Accelerating 3D Gaussian Fitting for High-Quality Radiance Fields
  Authors: Tao Lu, Ankit Dhiman, R Srinath, Emre Arslan, Angela Xing, Yuanbo Xiangli, R Venkatesh Babu, Srinath Sridhar
  Year: 2024
  ArXiv: 2412.13547
  Project: https://ivl.cs.brown.edu/research/turbo-gs
  Tags: Densification
  Key: Novel-view synthesis is an important problem in computer vision with applications in 3D reconstruction, mixed reality, and robotics. Recent methods like 3D Gaussian Splatting (3DGS) have become the pr

- Title: Representing Long Volumetric Video with Temporal Gaussian Hierarchy
  Authors: Zhen Xu, Yinghao Xu, Zhiyuan Yu, Sida Peng, Jiaming Sun, Hujun Bao, Xiaowei Zhou
  Year: 2024
  ArXiv: 2412.09608
  Project: https://zju3dv.github.io/longvolcap/
  Tags: Dynamic
  Key: This paper aims to address the challenge of reconstructing long volumetric videos from multi-view RGB videos. Recent dynamic view synthesis methods leverage powerful 4D representations, like feature g

- Title: Faster and Better 3D Splatting via Group Training
  Authors: Chengbo Wang, Guozheng Ma, Yifei Xue, Yizhen Lao
  Year: 2024
  Code: https://github.com/Chengbo-Wang/3DGS-with-Group-Training
  Project: https://chengbo-wang.github.io/3DGS-with-Group-Training/
  Paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Wang_Faster_and_Better_3D_Splatting_via_Group_Training_ICCV_2025_paper.pdf
  Tags: Densification, Optimization
  Key: 3D Gaussian Splatting (3DGS) has emerged as a powerful technique for novel view synthesis, demonstrating remarkable capability in high-fidelity scene reconstruction through its Gaussian primitive repr

- Title: Temporally Compressed 3D Gaussian Splatting for Dynamic Scenes
  Authors: Saqib Javed, Ahmad Jarrar Khan, Corentin Dumery, Chen Zhao, Mathieu Salzmann
  Year: 2024
  ArXiv: 2412.05700
  Project: https://ahmad-jarrar.github.io/tc-3dgs/
  Tags: Compression, Dynamic
  Key: Recent advancements in high-fidelity dynamic scene reconstruction have leveraged dynamic 3D Gaussians and 4D Gaussian Splatting for realistic scene representation. However, to make these methods viabl

- Title: PlanarSplatting: Accurate Planar Surface Reconstruction in 3 Minutes
  Authors: Bin Tan, Rui Yu, Yujun Shen, Nan Xue
  Year: 2024
  ArXiv: 2412.03451
  Project: https://icetttb.github.io/PlanarSplatting/
  Tags: Rendering
  Key: This paper presents PlanarSplatting, an ultra-fast and accurate surface reconstruction approach for multiview indoor images. We take the 3D planes as the main objective due to their compactness and st

- Title: Occam's LGS: A Simple Approach for Language Gaussian Splatting
  Authors: Jiahuan (Joanna) Cheng, Jan-Nico Zaech, Luc Van Gool, Danda Pani Paudel
  Year: 2024
  ArXiv: 2412.01807
  Project: https://insait-institute.github.io/OccamLGS/
  Tags: Language Embedding, Segmentation
  Key: Gaussian Splatting is a widely adopted approach for 3D scene representation that offers efficient, high-quality 3D reconstruction and rendering. A major reason for the success of 3DGS is its simplicit

- Title: Speedy-Splat: Fast 3D Gaussian Splatting with Sparse Pixels and Sparse Primitives
  Authors: Alex Hanson, Allen Tu, Geng Lin, Vasu Singla, Matthias Zwicker, Tom Goldstein
  Year: 2024
  ArXiv: 2412.00578
  Tags: Sparse
  Key: 3D Gaussian Splatting (3D-GS) is a recent 3D scene reconstruction technique that enables real-time rendering of novel views by modeling scenes as parametric point clouds of differentiable 3D Gaussians

- Title: Mini-Splatting2: Building 360 Scenes within Minutes via Aggressive Gaussian Densification
  Authors: Guangchi Fang, Bing Wang
  Year: 2024
  ArXiv: 2411.12788
  Code: https://github.com/fatPeter/mini-splatting2
  Tags: Densification
  Key: In this study, we explore the essential challenge of fast scene optimization for Gaussian Splatting. Through a thorough analysis of the geometry modeling process, we reveal that dense point clouds can

- Title: GPS-Gaussian+: Generalizable Pixel-wise 3D Gaussian Splatting for Real-Time Human-Scene Rendering from Sparse Views
  Authors: Boyao Zhou, Shunyuan Zheng, Hanzhang Tu, Ruizhi Shao, Boning Liu, Shengping Zhang, Liqiang Nie, Yebin Liu
  Year: 2024
  ArXiv: 2411.11363
  Project: https://yaourtb.github.io/GPS-Gaussian+
  Tags: Dynamic, Rendering
  Key: Differentiable rendering techniques have recently shown promising results for free-viewpoint video synthesis of characters. However, such methods, either Gaussian Splatting or neural implicit renderin

- Title: Sort-free Gaussian Splatting via Weighted Sum Rendering
  Authors: Qiqi Hou, Randall Rauwendaal, Zifeng Li, Hoang Le, Farzad Farhadzadeh, Fatih Porikli, Alexei Bourd, Amir Said
  Year: 2024
  ArXiv: 2410.18931
  Tags: Rendering
  Key: Recently, 3D Gaussian Splatting (3DGS) has emerged as a significant advancement in 3D scene reconstruction, attracting considerable attention due to its ability to recover high-fidelity details while

- Title: FlashGS: Efficient 3D Gaussian Splatting for Large-scale and High-resolution Rendering
  Authors: Guofeng Feng, Siyan Chen, Rong Fu, Zimu Liao, Yi Wang, Tao Liu, Zhilin Pei, Hengjie Li, Xingcheng Zhang, Bo Dai
  Year: 2024
  ArXiv: 2408.07967
  Code: https://github.com/InternLandMark/FlashGS
  Key: This work introduces FlashGS, an open-source CUDA Python library, designed to facilitate the efficient differentiable rasterization of 3D Gaussian Splatting through algorithmic and kernel-level optimi

- Title: GSCore: Efficient Radiance Field Rendering via Architectural Support for 3D Gaussian Splatting
  Authors: Junseo Lee, Seokwon Lee, Jungi Lee, Junyong Park, Jaewoong Sim
  Year: 2024
  Paper: https://jaewoong.org/pubs/asplos24-gscore.pdf
  Tags: Rendering
  Key: This paper presents GSCore, a hardware acceleration unit that efficiently executes the rendering pipeline of 3D Gaussian Splatting with algorithmic optimizations. GSCore builds on the observations fro

- Title: Taming 3DGS: High-Quality Radiance Fields with Limited Resources
  Authors: Saswat Subhajyoti Mallick, Rahul Goel, Bernhard Kerbl, Francisco Vicente Carrasco, Markus Steinberger, Fernando De La Torre
  Year: 2024
  ArXiv: 2406.15643
  Code: https://github.com/humansensinglab/taming-3dgs
  Project: https://humansensinglab.github.io/taming-3dgs/
  Tags: Densification
  Key: 3D Gaussian Splatting (3DGS) has transformed novel-view synthesis with its fast, interpretable, and high-fidelity rendering. However, its resource requirements limit its usability. Especially on const

- Title: Hash3D: Training-free Acceleration for 3D Generation
  Authors: Xingyi Yang, Xinchao Wang
  Year: 2024
  ArXiv: 2404.06091
  Code: https://github.com/Adamdad/hash3D
  Project: https://adamdad.github.io/hash3D/
  Tags: Diffusion
  Key: The evolution of 3D generative modeling has been notably propelled by the adoption of 2D diffusion models. Despite this progress, the cumbersome optimization process per se presents a critical hurdle

- Title: EAGLES: Efficient Accelerated 3D Gaussians with Lightweight EncodingS
  Authors: Sharath Girish, Kamal Gupta, Abhinav Shrivastava
  Year: 2023
  ArXiv: 2312.04564
  Code: https://github.com/Sharath-girish/efficientgaussian
  Project: https://efficientgaussian.github.io/
  Tags: Densification
  Key: Recently, 3D Gaussian splatting (3D-GS) has gained popularity in novel-view scene synthesis. It addresses the challenges of lengthy training times and slow rendering speeds associated with Neural Radi

- Title: DISTWAR: Fast Differentiable Rendering on Raster-based Rendering Pipelines
  Authors: Sankeerth Durvasula, Adrian Zhao, Fan Chen, Ruofan Liang, Pawan Kumar Sanjaya, Nandita Vijaykumar
  Year: 2024
  ArXiv: 2401.05345
  Code: https://github.com/Accelsnow/gaussian-splatting-distwar
  Tags: Rendering
  Key: Differentiable rendering is a technique used in an important emerging class of visual computing applications that involves representing a 3D scene as a model that is trained from 2D images using gradi

================================================================================
CATEGORY: Antialiasing (6 papers)
================================================================================

- Title: HDGS: Textured 2D Gaussian Splatting for Enhanced Scene Rendering
  Authors: Yunzhou Song, Heguang Lin, Jiahui Lei, Lingjie Liu, Kostas Daniilidis
  Year: 2024
  ArXiv: 2412.01823
  Tags: 2DGS, Meshing
  Key: Recent advancements in neural rendering, particularly 2D Gaussian Splatting (2DGS), have shown promising results for jointly reconstructing fine appearance and geometry by leveraging 2D Gaussian surfe

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Ray Tracing, Relight, Rendering, 360 degree, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: SA-GS: Scale-Adaptive Gaussian Splatting for Training-Free Anti-Aliasing
  Authors: Xiaowei Song, Jv Zheng, Shiran Yuan, Huan-ang Gao, Jingwei Zhao, Xiang He, Weihao Gu, Hao Zhao
  Year: 2024
  ArXiv: 2403.19615
  Code: https://github.com/zsy1987/SA-GS/
  Project: https://kevinsong729.github.io/project-pages/SA-GS/
  Tags: Rendering
  Key: In this paper, we present a Scale-adaptive method for Anti-aliasing Gaussian Splatting (SA-GS). While the state-of-the-art method Mip-Splatting needs modifying the training procedure of Gaussian splat

- Title: Analytic-Splatting: Anti-Aliased 3D Gaussian Splatting via Analytic Integration
  Authors: Zhihao Liang, Qi Zhang, Wenbo Hu, Ying Feng, Lei Zhu, Kui Jia
  Year: 2024
  ArXiv: 2403.11056
  Code: https://github.com/lzhnb/Analytic-Splatting
  Project: https://lzhnb.github.io/project-pages/analytic-splatting/
  Tags: Rendering
  Key: The 3D Gaussian Splatting (3DGS) gained its popularity recently by combining the advantages of both primitive-based and volumetric 3D representations, resulting in improved quality and efficiency for

- Title: Multi-Scale 3D Gaussian Splatting for Anti-Aliased Rendering
  Authors: Zhiwen Yan, Weng Fei Low, Yu Chen, Gim Hee Lee
  Year: 2023
  ArXiv: 2311.17089
  Tags: Rendering
  Key: 3D Gaussians have recently emerged as a highly efficient representation for 3D reconstruction and rendering. Despite its high rendering quality and speed at high resolutions, they both deteriorate dra

- Title: Mip-Splatting Alias-free 3D Gaussian Splatting
  Authors: Zehao Yu, Anpei Chen, Binbin Huang, Torsten Sattler, Andreas Geiger
  Year: 2023
  ArXiv: 2311.16493
  Code: https://github.com/autonomousvision/mip-splatting
  Project: https://niujinshuchong.github.io/mip-splatting/
  Tags: Rendering
  Key: Recently, 3D Gaussian Splatting (3DGS) has demonstrated impressive novel view synthesis results, reaching high fidelity and efficiency. However, strong artifacts can be observed when changing the samp

================================================================================
CATEGORY: Autonomous Driving (12 papers)
================================================================================

- Title: STORM: Spatio-Temporal Reconstruction Model for Large-Scale Outdoor Scenes
  Authors: Jiawei Yang, Jiahui Huang, Yuxiao Chen, Yan Wang, Boyi Li, Yurong You, Apoorva Sharma, Maximilian Igl, Peter Karkus, Danfei Xu, Boris Ivanovic, Yue Wang, Marco Pavone
  Year: 2024
  ArXiv: 2501.00602
  Tags: Dynamic, Large-Scale
  Key: We present STORM, a spatio-temporal reconstruction model designed for reconstructing dynamic outdoor scenes from sparse observations. Existing dynamic reconstruction methods often rely on per-scene op

- Title: DreamDrive: Generative 4D Scene Modeling from Street View Images
  Authors: Jiageng Mao, Boyi Li, Boris Ivanovic, Yuxiao Chen, Yan Wang, Yurong You, Chaowei Xiao, Danfei Xu, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2501.00601
  Tags: Dynamic, Feed-Forward
  Key: Synthesizing photo-realistic visual observations from an ego vehicle's driving trajectory is a critical step towards scalable training of self-driving models. Reconstruction-based methods create 3D sc

- Title: SplatAD: Real-Time Lidar and Camera Rendering with 3D Gaussian Splatting for Autonomous Driving
  Authors: Georg Hess, Carl Lindström, Maryam Fatemi, Christoffer Petersson, Lennart Svensson
  Year: 2024
  ArXiv: 2411.16816
  Project: https://research.zenseact.com/publications/splatad/
  Key: Ensuring the safety of autonomous robots, such as self-driving vehicles, requires extensive testing across diverse driving scenarios. Simulation is a key ingredient for conducting such testing in a co

- Title: BEINGS: Bayesian Embodied Image-goal Navigation with Gaussian Splatting
  Authors: Wugang Meng, Tianfu Wu, Huan Yin, Fumin Zhang
  Year: 2024
  ArXiv: 2409.10216
  Code: https://github.com/guaMass/BEINGS
  Project: https://www.mwg.ink/BEINGS-web
  Tags: Robotics
  Key: Image-goal navigation enables a robot to reach the location where a target image was captured, using visual cues for guidance. However, current methods either rely heavily on data and computationally

- Title: OmniRe: Omni Urban Scene Reconstruction
  Authors: Ziyu Chen, Jiawei Yang, Jiahui Huang, Riccardo de Lutio, Janick Martinez Esturo, Boris Ivanovic, Or Litany, Zan Gojcic, Sanja Fidler, Marco Pavone, Li Song, Yue Wang
  Year: 2024
  ArXiv: 2408.16760
  Code: https://github.com/ziyc/drivestudio
  Project: https://ziyc.github.io/omnire/
  Key: We introduce OmniRe, a holistic approach for efficiently reconstructing high-fidelity dynamic urban scenes from on-device logs. Recent methods for modeling driving sequences using neural radiance fiel

- Title: TCLC-GS: Tightly Coupled LiDAR-Camera Gaussian Splatting for Surrounding Autonomous Driving Scenes
  Authors: Cheng Zhao, Su Sun, Ruoyu Wang, Yuliang Guo, Jun-Jun Wan, Zhou Huang, Xinyu Huang, Yingjie Victor Chen, Liu Ren
  Year: 2024
  ArXiv: 2404.02410
  Tags: Lidar
  Key: Most 3D Gaussian Splatting (3D-GS) based methods for urban scenes initialize 3D Gaussians directly with 3D LiDAR points, which not only underutilizes LiDAR data capabilities but also overlooks the pot

- Title: HUGS: Holistic Urban 3D Scene Understanding via Gaussian Splatting
  Authors: Hongyu Zhou, Jiahao Shao, Lu Xu, Dongfeng Bai, Weichao Qiu, Bingbing Liu, Yue Wang, Andreas Geiger, Yiyi Liao
  Year: 2023
  ArXiv: 2403.12722
  Code: https://github.com/hyzhou404/HUGS
  Project: https://xdimlab.github.io/hugs_website/
  Key: Holistic understanding of urban scenes based on RGB images is a challenging yet important problem. It encompasses understanding both the geometry and appearance to enable novel view synthesis, parsing

- Title: GaussNav: Gaussian Splatting for Visual Navigation
  Authors: Xiaohan Lei, Min Wang, Wengang Zhou, Houqiang Li
  Year: 2024
  ArXiv: 2403.11625
  Code: https://github.com/XiaohanLei/GaussNav
  Project: https://xiaohanlei.github.io/projects/GaussNav/
  Tags: Robotics
  Key: In embodied vision, Instance ImageGoal Navigation (IIN) requires an agent to locate a specific object depicted in a goal image within an unexplored environment. The primary difficulty of IIN stems fro

- Title: Beyond Uncertainty: Risk-Aware Active View Acquisition for Safe Robot Navigation and 3D Scene Understanding with FisherRF
  Authors: Guangyi Liu, Wen Jiang, Boshu Lei, Vivek Pandey, Kostas Daniilidis, Nader Motee
  Year: 2024
  ArXiv: 2403.11396
  Tags: Robotics, Uncertainty
  Key: This work proposes a novel approach to bolster both the robot's risk assessment and safety measures while deepening its understanding of 3D scenes, which is achieved by leveraging Radiance Field (RF)

- Title: Street Gaussians for Modeling Dynamic Urban Scenes
  Authors: Yunzhi Yan, Haotong Lin, Chenxu Zhou, Weijie Wang, Haiyang Sun, Kun Zhan, Xianpeng Lang, Xiaowei Zhou, Sida Peng
  Year: 2024
  ArXiv: 2401.01339
  Code: https://github.com/zju3dv/street_gaussians
  Project: https://zju3dv.github.io/street_gaussians/
  Key: This paper aims to tackle the problem of modeling dynamic urban street scenes from monocular videos. Recent methods extend NeRF by incorporating tracked vehicle poses to animate vehicles, enabling pho

- Title: DrivingGaussian: Composite Gaussian Splatting for Surrounding Dynamic Autonomous Driving Scenes
  Authors: Xiaoyu Zhou, Zhiwei Lin, Xiaojun Shan, Yongtao Wang, Deqing Sun, Ming-Hsuan Yang
  Year: 2023
  ArXiv: 2312.07920
  Project: https://pkuvdig.github.io/DrivingGaussian/
  Key: We present DrivingGaussian, an efficient and effective framework for surrounding dynamic autonomous driving scenes. For complex scenes with moving objects, we first sequentially and progressively mode

- Title: Periodic Vibration Gaussian: Dynamic Urban Scene Reconstruction and Real-time Rendering
  Authors: Yurui Chen, Chun Gu, Junzhe Jiang, Xiatian Zhu, Li Zhang
  Year: 2023
  ArXiv: 2311.18561
  Code: https://github.com/fudan-zvg/PVG
  Project: https://fudan-zvg.github.io/PVG/
  Tags: Misc
  Key: Modeling dynamic, large-scale urban scenes is challenging due to their highly intricate geometric structures and unconstrained dynamics in both space and time. Prior methods often employ high-level ar

================================================================================
CATEGORY: Avatar (62 papers)
================================================================================

- Title: GSTAR: Gaussian Surface Tracking and Reconstruction
  Authors: Chengwei Zheng, Lixin Xue, Juan Zarate, Jie Song
  Year: 2025
  ArXiv: 2501.10283
  Project: chengwei-zheng.github.io/GSTAR/
  Tags: Dynamic, Meshing
  Key: 3D Gaussian Splatting techniques have enabled efficient photo-realistic rendering of static scenes. Recent works have extended these approaches to support surface reconstruction and tracking. However,

- Title: RMAvatar: Photorealistic Human Avatar Reconstruction from Monocular Video Based on Rectified Mesh-embedded Gaussians
  Authors: Sen Peng, Weixing Xie, Zilong Wang, Xiaohu Guo, Zhonggui Chen, Baorong Yang, Xiao Dong
  Year: 2025
  ArXiv: 2501.07104
  Code: https://github.com/RMAvatar/RMAvatar
  Project: https://rm-avatar.github.io/
  Tags: Dynamic, Meshing, Monocular
  Key: We introduce RMAvatar, a novel human avatar representation with Gaussian splatting embedded on mesh to learn clothed avatar from a monocular video. We utilize the explicit mesh geometry to represent m

- Title: Synthetic Prior for Few-Shot Drivable Head Avatar Inversion
  Authors: Wojciech Zielonka, Stephan J. Garbin, Alexandros Lattas, George Kopanas, Paulo Gotardo, Thabo Beeler, Justus Thies, Timo Bolkart
  Year: 2025
  ArXiv: 2501.06903
  Project: https://zielon.github.io/synshot/
  Tags: Dynamic, Sparse
  Key: We present SynShot, a novel method for the few-shot inversion of a drivable head avatar based on a synthetic prior. We tackle two major challenges. First, training a controllable 3D generative network

- Title: Arc2Avatar: Generating Expressive 3D Avatars from a Single Image via ID Guidance
  Authors: Dimitrios Gerogiannis, Foivos Paraperas Papantoniou, Rolandos Alexandros Potamias, Alexandros Lattas, Stefanos Zafeiriou
  Year: 2025
  ArXiv: 2501.05379
  Tags: Diffusion
  Key: Inspired by the effectiveness of 3D Gaussian Splatting (3DGS) in reconstructing detailed 3D scenes within multi-view setups and the emergence of large 2D human foundation models, we introduce Arc2Avat

- Title: PERSE: Personalized 3D Generative Avatars from A Single Portrait
  Authors: Hyunsoo Cha, Inhee Lee, Hanbyul Joo
  Year: 2024
  ArXiv: 2412.21206
  Project: https://hyunsoocha.github.io/perse/
  Tags: GAN
  Key: We present PERSE, a method for building an animatable personalized generative avatar from a reference portrait. Our avatar model enables facial attribute editing in a continuous and disentangled laten

- Title: FaceLift: Single Image to 3D Head with View Generation and GS-LRM
  Authors: Weijie Lyu, Yi Zhou, Ming-Hsuan Yang, Zhixin Shu
  Year: 2024
  ArXiv: 2412.17812
  Project: https://www.wlyu.me/FaceLift/
  Tags: Feed-Forward
  Key: We present FaceLift, a feed-forward approach for rapid, high-quality, 360-degree head reconstruction from a single image. Our pipeline begins by employing a multi-view latent diffusion model that gene

- Title: SqueezeMe: Efficient Gaussian Avatars for VR
  Authors: Shunsuke Saito, Stanislav Pidhorskyi, Igor Santesteban, Forrest Iandola, Divam Gupta, Anuj Pahuja, Nemanja Bartolovic, Frank Yu, Emanuel Garbin, Tomas Simon
  Year: 2024
  ArXiv: 2412.15171
  Project: https://forresti.github.io/squeezeme
  Tags: Dynamic
  Key: Gaussian Splatting has enabled real-time 3D human avatars with unprecedented levels of visual quality. While previous methods require a desktop GPU for real-time inference of a single avatar, we aim t

- Title: Real-time Free-view Human Rendering from Sparse-view RGB Videos using Double Unprojected Textures
  Authors: Guoxing Sun, Rishabh Dabral, Heming Zhu, Pascal Fua, Christian Theobalt, Marc Habermann
  Year: 2024
  ArXiv: 2412.13183
  Project: https://vcai.mpi-inf.mpg.de/projects/DUT/
  Tags: Sparse, Texturing
  Key: Real-time free-view human rendering from sparse-view RGB inputs is a challenging task due to the sensor scarcity and the tight time budget. To ensure efficiency, recent methods leverage 2D CNNs operat

- Title: CAP4D: Creating Animatable 4D Portrait Avatars with Morphable Multi-View Diffusion Models
  Authors: Felix Taubner, Ruihang Zhang, Mathieu Tuli, David B. Lindell
  Year: 2024
  ArXiv: 2412.12093
  Project: https://felixtaubner.github.io/cap4d/
  Key: Reconstructing photorealistic and dynamic portrait avatars from images is essential to many applications including advertising, visual effects, and virtual reality. Depending on the application, avata

- Title: GAF: Gaussian Avatar Reconstruction from Monocular Videos via Multi-view Diffusion
  Authors: Jiapeng Tang, Davide Davoli, Tobias Kirschstein, Liam Schoneveld, Matthias Nießner
  Year: 2024
  ArXiv: 2412.10209
  Project: https://tangjiapeng.github.io/projects/GAF/
  Key: We propose a novel approach for reconstructing animatable 3D Gaussian avatars from monocular videos captured by commodity devices like smartphones. Photorealistic 3D head avatar reconstruction from su

- Title: SimAvatar: Simulation-Ready Avatars with Layered Hair and Clothing
  Authors: Xueting Li, Ye Yuan, Shalini De Mello, Gilles Daviet, Jonathan Leaf, Miles Macklin, Jan Kautz, Umar Iqbal
  Year: 2024
  ArXiv: 2412.09545
  Project: https://nvlabs.github.io/SimAvatar/
  Tags: Diffusion, Language Embedding
  Key: We introduce SimAvatar, a framework designed to generate simulation-ready clothed 3D human avatars from a text prompt. Current text-driven human avatar generation methods either model hair, clothing,

- Title: GASP: Gaussian Avatars with Synthetic Priors
  Authors: Jack Saunders, Charlie Hewitt, Yanan Jian, Marek Kowalski, Tadas Baltrušaitis, Yiye Chen, Darren Cosker, Virginia Estellers, Nicholas Gyde, Vinay Namboodiri, Benjamin Lundell
  Year: 2024
  ArXiv: 2412.07739
  Project: https://microsoft.github.io/GASP/
  Key: Gaussian Splatting has changed the game for real-time photo-realistic rendering. One of the most popular applications of Gaussian Splatting is to create animatable avatars, known as Gaussian Avatars.

- Title: FATE: Full-head Gaussian Avatar with Textural Editing from Monocular Video
  Authors: Jiawei Zhang, Zijian Wu, Zhiyang Liang, Yicheng Gong, Dongfang Hu, Yao Yao, Xun Cao, Hao Zhu
  Year: 2024
  ArXiv: 2411.15604
  Code: https://github.com/zjwfufu/FateAvatar
  Project: https://zjwfufu.github.io/FATE-page/
  Tags: Dynamic, Editing, Monocular, Texturing
  Key: Reconstructing high-fidelity, animatable 3D head avatars from effortlessly captured monocular videos is a pivotal yet formidable challenge. Although significant progress has been made in rendering per

- Title: Generalizable and Animatable Gaussian Head Avatar
  Authors: Xuangeng Chu, Tatsuya Harada
  Year: 2024
  ArXiv: 2410.07971
  Code: https://github.com/xg-chu/GAGAvatar
  Project: https://xg-chu.site/project_gagavatar/
  Key: In this paper, we propose Generalizable and Animatable Gaussian head Avatar (GAGAvatar) for one-shot animatable head avatar reconstruction. Existing methods rely on neural radiance fields, leading to

- Title: V^3: Viewing Volumetric Videos on Mobiles via Streamable 2D Dynamic Gaussians
  Authors: Penghao Wang, Zhirui Zhang, Liao Wang, Kaixin Yao, Siyuan Xie, Jingyi Yu, Minye Wu, Lan Xu
  Year: 2024
  ArXiv: 2409.13648
  Code: https://github.com/AuthorityWang/VideoGS
  Project: https://authoritywang.github.io/v3/
  Key: Experiencing high-fidelity volumetric video as seamlessly as 2D videos is a long-held dream. However, current dynamic 3DGS methods, despite their high rendering quality, face challenges in streaming o

- Title: PSHuman: Photorealistic Single-view Human Reconstruction using Cross-Scale Diffusion
  Authors: Peng Li, Wangguandong Zheng, Yuan Liu, Tao Yu, Yangguang Li, Xingqun Qi, Mengfei Li, Xiaowei Chi, Siyu Xia, Wei Xue, Wenhan Luo, Qifeng Liu, Yike Guo
  Year: 2024
  ArXiv: 2409.10141
  Code: https://github.com/pengHTYX/PSHuman
  Project: https://penghtyx.github.io/PSHuman/
  Tags: Diffusion, Meshing
  Key: Detailed and photorealistic 3D human modeling is essential for various applications and has seen tremendous progress. However, full-body reconstruction from a monocular RGB image remains challenging d

- Title: DualGS: Robust Dual Gaussian Splatting for Immersive Human-centric Volumetric Videos
  Authors: Yuheng Jiang, Zhehao Shen, Yu Hong, Chengcheng Guo, Yize Wu, Yingliang Zhang, Jingyi Yu, Lan Xu
  Year: 2024
  ArXiv: 2409.08353
  Code: https://github.com/HiFi-Human/DualGS
  Project: https://nowheretrix.github.io/DualGS/
  Key: Volumetric video represents a transformative advancement in visual media, enabling users to freely navigate immersive virtual experiences and narrowing the gap between digital and real worlds. However

- Title: HeadGAP: Few-shot 3D Head Avatar via Generalizable Gaussian Priors
  Authors: Xiaozheng Zheng, Chao Wen, Zhaohu Li, Weiyi Zhang, Zhuo Su, Xu Chang, Yang Zhao, Zheng Lv, Xiaoyuan Zhang, Yongjie Zhang, Guidong Wang, Lan Xu
  Year: 2024
  ArXiv: 2408.06019
  Project: https://headgap.github.io/
  Tags: Dynamic
  Key: In this paper, we present a novel 3D head avatar creation approach capable of generalizing from few-shot in-the-wild data with high-fidelity and animatable robustness. Given the underconstrained natur

- Title: HumanSplat: Generalizable Single-Image Human Gaussian Splatting with Structure Priors
  Authors: Panwang Pan, Zhuo Su, Chenguo Lin, Zhen Fan, Yongjie Zhang, Zeming Li, Tingting Shen, Yadong Mu, Yebin Liu
  Year: 2023
  ArXiv: 2406.12459
  Code: https://github.com/humansplat/humansplat
  Project: https://humansplat.github.io/
  Key: Despite recent advancements in high-fidelity human reconstruction techniques, the requirements for densely captured images or time-consuming per-instance optimization significantly hinder their applic

- Title: GarmentDreamer: 3DGS Guided Garment Synthesis with Diverse Geometry and Texture Details
  Authors: Boqian Li, Xuan Li, Ying Jiang, Tianyi Xie, Feng Gao, Huamin Wang, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2405.12420
  Code: https://github.com/boqian-li/GarmentDreamer
  Project: https://xuan-li.github.io/GarmentDreamerDemo/
  Tags: Dynamic, Rendering, Texturing
  Key: Traditional 3D garment creation is labor-intensive, involving sketching, modeling, UV mapping, and texturing, which are time-consuming and costly. Recent advances in diffusion-based generative models

- Title: Gaussian Head & Shoulders: High Fidelity Neural Upper Body Avatars with Anchor Gaussian Guided Texture Warping
  Authors: Tianhao Wu, Jing Yang, Zhilin Guo, Jingyi Wan, Fangcheng Zhong, Cengiz Oztireli
  Year: 2024
  ArXiv: 2405.12069
  Project: https://gaussian-head-shoulders.netlify.app/
  Tags: Dynamic
  Key: By equipping the most recent 3D Gaussian Splatting representation with head 3D morphable models (3DMM), existing methods manage to create head avatars with high fidelity. However, most existing method

- Title: Guess The Unseen: Dynamic 3D Scene Reconstruction from Partial 2D Glimpses
  Authors: Inhee Lee, Byungjun Kim, Hanbyul Joo
  Year: 2024
  ArXiv: 2404.14410
  Code: https://github.com/snuvclab/gtu/
  Project: https://snuvclab.github.io/gtu/
  Key: In this paper, we present a method to reconstruct the world and multiple dynamic humans in 3D from a monocular video input. As a key idea, we represent both the world and multiple humans via the recen

- Title: Gaussian Splatting Decoder for 3D‑aware Generative Adversarial Networks
  Authors: Florian Barthel, Arian Beckmann, Wieland Morgenstern, Anna Hilsmann, Peter Eisert
  Year: 2024
  ArXiv: 2404.10625
  Code: https://github.com/fraunhoferhhi/gaussian_gan_decoder
  Project: https://florian-barthel.github.io/gaussian_decoder/index.html
  Key: NeRF-based 3D-aware Generative Adversarial Networks like EG3D or GIRAFFE have shown very high rendering quality under large representational variety. However, rendering with Neural Radiance Fields pos

- Title: OccGaussian: 3D Gaussian Splatting for Occluded Human Rendering
  Authors: Jingrui Ye, Zongkai Zhang, Yujiao Jiang, Qingmin Liao, Wenming Yang, Zongqing Lu
  Year: 2024
  ArXiv: 2404.07991
  Code: https://github.com/wenj/GoMAvatar
  Project: https://wenj.github.io/GoMAvatar/
  Key: Rendering dynamic 3D human from monocular videos is crucial for various applications such as virtual reality and digital entertainment. Most methods assume the people is in an unobstructed scene, whil

- Title: GoMAvatar: Efficient Animatable Human Modeling from Monocular Video Using Gaussians-on-Mesh
  Authors: Jing Wen, Xiaoming Zhao, Zhongzheng Ren, Alexander G. Schwing, Shenlong Wang
  Year: 2024
  ArXiv: 2404.07991
  Code: https://github.com/wenj/GoMAvatar
  Project: https://wenj.github.io/GoMAvatar/
  Tags: Monocular
  Key: We introduce GoMAvatar, a novel approach for real-time, memory-efficient, high-quality animatable human modeling. GoMAvatar takes as input a single monocular video to create a digital avatar capable o

- Title: HAHA: Highly Articulated Gaussian Human Avatars with Textured Mesh Prior
  Authors: Zhijing Shao, Zhaolong Wang, Zhuang Li, Duotun Wang, Xiangru Lin, Yu Zhang, Mingming Fan, Zeyu Wang
  Year: 2024
  ArXiv: 2404.01053
  Code: https://github.com/david-svitov/HAHA
  Key: We present HAHA - a novel approach for animatable human avatar generation from monocular input videos. The proposed method relies on learning the trade-off between the use of Gaussian splatting and a

- Title: SplatFace: Gaussian Splat Face Reconstruction Leveraging an Optimizable Surface
  Authors: Zhijing Shao, Zhaolong Wang, Zhuang Li, Duotun Wang, Xiangru Lin, Yu Zhang, Mingming Fan, Zeyu Wang
  Year: 2024
  ArXiv: 2403.18784
  Key: We present SplatFace, a novel Gaussian splatting framework designed for 3D human face reconstruction without reliance on accurate pre-determined geometry. Our method is designed to simultaneously deli

- Title: Bridging 3D Gaussian and Mesh for Freeview Video Rendering
  Authors: Yuting Xiao, Xuan Wang, Jiafei Li, Hongrui Cai, Yanbo Fan, Nan Xue, Minghui Yang, Yujun Shen, Shenghua Gao
  Year: 2024
  ArXiv: 2403.11453
  Tags: Dynamic, Meshing
  Key: This is only a preview version of GauMesh. Recently, primitive-based rendering has been proven to achieve convincing results in solving the problem of modeling and rendering the 3D dynamic scene from

- Title: SplattingAvatar: Realistic Real-Time Human Avatars with Mesh-Embedded Gaussian Splatting
  Authors: Zhijing Shao, Zhaolong Wang, Zhuang Li, Duotun Wang, Xiangru Lin, Yu Zhang, Mingming Fan, Zeyu Wang
  Year: 2024
  ArXiv: 2403.05087
  Code: https://github.com/initialneil/SplattingAvatar
  Project: https://initialneil.github.io/SplattingAvatar
  Key: We present SplattingAvatar, a hybrid 3D representation of photorealistic human avatars with Gaussian Splatting embedded on a triangle mesh, which renders over 300 FPS on a modern GPU and 30 FPS on a m

- Title: GVA: Reconstructing Vivid 3D Gaussian Avatars from Monocular Videos
  Authors: Xinqi Liu, Chenming Wu, Jialun Liu, Xing Liu, Jinbo Wu, Chen Zhao, Haocheng Feng, Errui Ding, Jingdong Wang
  Year: 2024
  ArXiv: 2402.16607
  Project: https://3d-aigc.github.io/GEA/
  Key: In this paper, we present a novel method that facilitates the creation of vivid 3D Gaussian avatars from monocular video inputs (GVA). Our innovation lies in addressing the intricate challenges of del

- Title: GaussianHair: Hair Modeling and Rendering with Light-aware Gaussians
  Authors: Haimin Luo, Min Ouyang, Zijun Zhao, Suyi Jiang, Longwen Zhang, Qixuan Zhang, Wei Yang, Lan Xu, Jingyi Yu
  Year: 2024
  ArXiv: 2402.10483
  Key: Hairstyle reflects culture and ethnicity at first glance. In the digital era, various realistic human hairstyles are also critical to high-fidelity digital human assets for beauty and inclusivity. Yet

- Title: ImplicitDeepfake: Plausible Face-Swapping through Implicit Deepfake Generation using NeRF and Gaussian Splatting
  Authors: Georgii Stanishevskii, Jakub Steczkiewicz, Tomasz Szczepanik, Sławomir Tadeja, Jacek Tabor, Przemysław Spurek
  Year: 2024
  ArXiv: 2402.06390
  Key: Numerous emerging deep-learning techniques have had a substantial impact on computer graphics. Among the most promising breakthroughs are the recent rise of Neural Radiance Fields (NeRFs) and Gaussian

- Title: HeadStudio: Text to Animatable Head Avatars with 3D Gaussian Splatting
  Authors: Zhenglin Zhou, Fan Ma, Hehe Fan, Yi Yang
  Year: 2024
  ArXiv: 2402.06149
  Code: https://github.com/ZhenglinZhou/HeadStudio/
  Project: https://zhenglinzhou.github.io/HeadStudio-ProjectPage/
  Key: Creating digital avatars from textual prompts has long been a desirable yet challenging task. Despite the promising outcomes obtained through 2D diffusion priors in recent works, current methods face

- Title: Rig3DGS: Creating Controllable Portraits from Casual Monocular Videos
  Authors: Alfredo Rivero, ShahRukh Athar, Zhixin Shu, Dimitris Samaras
  Year: 2024
  ArXiv: 2402.03723
  Project: https://shahrukhathar.github.io/2024/02/05/Rig3DGS.html
  Key: Creating controllable 3D human portraits from casual smartphone videos is highly desirable due to their immense value in AR/VR applications. The recent development of 3D Gaussian Splatting (3DGS) has

- Title: PSAvatar: A Point-based Morphable Shape Model for Real-Time Head Avatar Creation with 3D Gaussian Splatting
  Authors: Zhongyuan Zhao, Zhenyu Bao, Qing Li, Guoping Qiu, Kanglin Liu
  Year: 2024
  ArXiv: 2401.12900
  Key: Despite much progress, achieving real-time high-fidelity head avatar animation is still difficult and existing methods have to trade-off between speed and quality. 3DMM based methods often fail to mod

- Title: GaussianBody: Clothed Human Reconstruction via 3d Gaussian Splatting
  Authors: Mengtian Li, Shengxiang Yao, Zhifeng Xie, Keyu Chen, Yu-Gang Jiang
  Year: 2024
  ArXiv: 2401.09720
  Key: In this work, we propose a novel clothed human reconstruction method called GaussianBody, based on 3D Gaussian Splatting. Compared with the costly neural radiance based models, 3D Gaussian Splatting h

- Title: Gaussian Shadow Casting for Neural Characters
  Authors: Luis Bolanos, Shih-Yang Su, Helge Rhodin
  Year: 2024
  ArXiv: 2401.06116
  Code: https://github.com/LuisBolanos17/GaussianShadowCasting
  Tags: Relight, Rendering
  Key: Neural character models can now reconstruct detailed geometry and texture from video, but they lack explicit shadows and shading, leading to artifacts when generating novel views and poses or during r

- Title: Progress and Prospects in 3D Generative AI: A Technical Overview including 3D human
  Authors: Song Bai, Jie Li
  Year: 2024
  ArXiv: 2401.02620
  Tags: Review
  Key: While AI-generated text and 2D images continue to expand its territory, 3D generation has gradually emerged as a trend that cannot be ignored. Since the year 2023 an abundant amount of research papers

- Title: Human101: Training 100+FPS Human Gaussians in 100s from 1 View
  Authors: Mingwei Li, Jiachen Tao, Zongxin Yang, Yi Yang
  Year: 2023
  ArXiv: 2312.15258
  Code: https://github.com/longxiang-ai/Human101
  Project: https://longxiang-ai.github.io/Human101/
  Key: Reconstructing the human body from single-view videos plays a pivotal role in the virtual reality domain. One prevalent application scenario necessitates the rapid reconstruction of high-fidelity 3D d

- Title: Deformable 3D Gaussian Splatting for Animatable Human Avatars
  Authors: HyunJun Jung, Nikolas Brasch, Jifei Song, Eduardo Perez-Pellitero, Yiren Zhou, Zhihao Li, Nassir Navab, Benjamin Busam
  Year: 2023
  ArXiv: 2312.15059
  Key: Recent advances in neural radiance fields enable novel view synthesis of photo-realistic images in dynamic settings, which can be applied to scenarios with human animation. Commonly used implicit back

- Title: GAvatar: Animatable 3D Gaussian Avatars with Implicit Mesh Learning
  Authors: Ye Yuan, Xueting Li, Yangyi Huang, Shalini De Mello, Koki Nagano, Jan Kautz, Umar Iqbal
  Year: 2023
  ArXiv: 2312.11461
  Project: https://nvlabs.github.io/GAvatar/
  Tags: Meshing
  Key: Gaussian splatting has emerged as a powerful 3D representation that harnesses the advantages of both explicit (mesh) and implicit (NeRF) 3D representations. In this paper, we seek to leverage Gaussian

- Title: 3DGS-Avatar: Animatable Avatars via Deformable 3D Gaussian Splatting
  Authors: Zhiyin Qian, Shaofei Wang, Marko Mihajlovic, Andreas Geiger, Siyu Tang
  Year: 2023
  ArXiv: 2312.09228
  Code: https://github.com/mikeqzy/3dgs-avatar-release
  Project: https://neuralbodies.github.io/3DGS-Avatar/index.html
  Key: We introduce an approach that creates animatable human avatars from monocular videos using 3D Gaussian Splatting (3DGS). Existing methods based on neural radiance fields (NeRFs) achieve high-quality n

- Title: ASH: Animatable Gaussian Splats for Efficient and Photoreal Human Rendering
  Authors: Haokai Pang, Heming Zhu, Adam Kortylewski, Christian Theobalt, Marc Habermann
  Year: 2023
  ArXiv: 2312.05941
  Code: https://github.com/kv2000/ASH
  Project: https://vcai.mpi-inf.mpg.de/projects/ash/
  Key: Real-time rendering of photorealistic and controllable human avatars stands as a cornerstone in Computer Vision and Graphics. While recent advances in neural implicit rendering have unlocked unprecede

- Title: MonoGaussianAvatar: Monocular Gaussian Point-based Head Avatar
  Authors: Yufan Chen, Lizhen Wang, Qijing Li, Hongjiang Xiao, Shengping Zhang, Hongxun Yao, Yebin Liu
  Year: 2023
  ArXiv: 2312.04558
  Code: https://github.com/yufan1012/MonoGaussianAvatar
  Project: https://yufan1012.github.io/MonoGaussianAvatar
  Tags: Monocular
  Key: The ability to animate photo-realistic head avatars reconstructed from monocular portrait video sequences represents a crucial step in bridging the gap between the virtual and real worlds. Recent adva

- Title: Relightable Gaussian Codec Avatars
  Authors: Shunsuke Saito, Gabriel Schwartz, Tomas Simon, Junxuan Li, Giljoo Nam
  Year: 2023
  ArXiv: 2312.03704
  Code: https://github.com/facebookresearch/goliath
  Project: https://shunsukesaito.github.io/rgca/
  Tags: Relight
  Key: The fidelity of relighting is bounded by both geometry and appearance representations. For geometry, both mesh and volumetric approaches have difficulty modeling intricate structures like 3D hair geom

- Title: HiFi4G: High-Fidelity Human Performance Rendering via Compact Gaussian Splatting
  Authors: Yuheng Jiang, Zhehao Shen, Penghao Wang, Zhuo Su, Yu Hong, Yingliang Zhang, Jingyi Yu, Lan Xu
  Year: 2023
  ArXiv: 2312.03461
  Project: https://nowheretrix.github.io/HiFi4G/
  Key: We have recently seen tremendous progress in photo-real human modeling and rendering. Yet, efficiently rendering realistic human performance and integrating it into the rasterization pipeline remains

- Title: GauHuman: Articulated Gaussian Splatting from Monocular Human Videos
  Authors: Shoukang Hu Ziwei Liu
  Year: 2023
  ArXiv: 2312.02973
  Code: https://github.com/skhu101/GauHuman
  Project: https://skhu101.github.io/GauHuman/
  Key: We present, GauHuman, a 3D human model with Gaussian Splatting for both fast training (1~2 minutes) and real-time rendering (up to 189 FPS), compared with existing NeRF-based implicit representation m

- Title: HeadGaS: Real-Time Animatable Head Avatars via 3D Gaussian Splatting
  Authors: Helisa Dhamo, Yinyu Nie, Arthur Moreau, Jifei Song, Richard Shaw, Yiren Zhou, Eduardo Pérez-Pellitero
  Year: 2023
  ArXiv: 2312.02902
  Key: 3D head animation has seen major quality and runtime improvements over the last few years, particularly empowered by the advances in differentiable rendering and neural radiance fields. Real-time rend

- Title: Gaussian Head Avatar: Ultra High-fidelity Head Avatar via Dynamic Gaussians
  Authors: Yuelang Xu, Benwang Chen, Zhe Li, Hongwen Zhang, Lizhen Wang, Zerong Zheng, Yebin Liu
  Year: 2023
  ArXiv: 2312.03029
  Code: https://github.com/YuelangX/Gaussian-Head-Avatar
  Project: https://yuelangx.github.io/gaussianheadavatar/
  Key: Creating high-fidelity 3D head avatars has always been a research hotspot, but there remains a great challenge under lightweight sparse view setups. In this paper, we propose Gaussian Head Avatar repr

- Title: GPS-Gaussian: Generalizable Pixel-wise 3D Gaussian Splatting for Real-time Human Novel View Synthesis
  Authors: Shunyuan Zheng, Boyao Zhou, Ruizhi Shao, Boning Liu, Shengping Zhang, Liqiang Nie, Yebin Liu
  Year: 2023
  ArXiv: 2312.02155
  Code: https://github.com/ShunyuanZheng/GPS-Gaussian
  Project: https://shunyuanzheng.github.io/GPS-Gaussian
  Key: We present a new approach, termed GPS-Gaussian, for synthesizing novel views of a character in a real-time manner. The proposed method enables 2K-resolution rendering under a sparse-view camera settin

- Title: GaussianAvatar: Towards Realistic Human Avatar Modeling from a Single Video via Animatable 3D Gaussians
  Authors: Liangxiao Hu, Hongwen Zhang, Yuxiang Zhang, Boyao Zhou, Boning Liu, Shengping Zhang, Liqiang Nie
  Year: 2023
  ArXiv: 2312.02134
  Code: https://github.com/huliangxiao/GaussianAvatar
  Project: https://huliangxiao.github.io/GaussianAvatar
  Key: We present GaussianAvatar, an efficient approach to creating realistic human avatars with dynamic 3D appearances from a single video. We start by introducing animatable 3D Gaussians to explicitly repr

- Title: GaussianAvatars: Photorealistic Head Avatars with Rigged 3D Gaussians
  Authors: Shenhan Qian, Tobias Kirschstein, Liam Schoneveld, Davide Davoli, Simon Giebenhain, Matthias Nießner
  Year: 2023
  ArXiv: 2312.02069
  Code: https://github.com/ShenhanQian/GaussianAvatars
  Project: https://shenhanqian.github.io/gaussian-avatars
  Key: We introduce GaussianAvatars, a new method to create photorealistic head avatars that are fully controllable in terms of expression, pose, and viewpoint. The core idea is a dynamic 3D representation b

- Title: GaussianHead: High-fidelity Head Avatars with Learnable Gaussian Derivation
  Authors: Jie Wang, Jiu-Cheng Xie, Xianyan Li, Chi-Man Pun, Feng Xu, Hao Gao
  Year: 2023
  ArXiv: 2312.01632
  Code: https://github.com/chiehwangs/gaussian-head
  Project: https://chiehwangs.github.io/gaussian-head-page/
  Key: Constructing vivid 3D head avatars for given subjects and realizing a series of animations on them is valuable yet challenging. This paper presents GaussianHead, which models the actional human head w

- Title: FlashAvatar: High-fidelity Head Avatar with Efficient Gaussian Embedding
  Authors: Jun Xiang, Xuan Gao, Yudong Guo, Juyong Zhang
  Year: 2023
  ArXiv: 2312.02214
  Code: https://github.com/USTC3DV/FlashAvatar-code
  Project: https://ustc3dv.github.io/FlashAvatar/
  Key: We propose FlashAvatar, a novel and lightweight 3D animatable avatar representation that could reconstruct a digital avatar from a short monocular video sequence in minutes and render high-fidelity ph

- Title: HUGS: Human Gaussian Splats
  Authors: Muhammed Kocabas, Jen-Hao Rick Chang, James Gabriel, Oncel Tuzel, Anurag Ranjan
  Year: 2023
  ArXiv: 2311.17910
  Code: https://github.com/apple/ml-hugs
  Project: https://machinelearning.apple.com/research/hugs
  Key: Recent advances in neural rendering have improved both training and rendering times by orders of magnitude. While these methods demonstrate state-of-the-art quality and speed, they are designed for ph

- Title: Gaussian Shell Maps for Efficient 3D Human Generation
  Authors: Rameen Abdal, Wang Yifan, Zifan Shi, Yinghao Xu, Ryan Po, Zhengfei Kuang, Qifeng Chen, Dit-Yan Yeung, Gordon Wetzstein
  Year: 2023
  ArXiv: 2311.17857
  Code: https://github.com/computational-imaging/GSM
  Project: https://rameenabdal.github.io/GaussianShellMaps/
  Key: Efficient generation of 3D digital humans is important in several industries, including virtual reality, social media, and cinematic production. 3D generative adversarial networks (GANs) have demonstr

- Title: HumanGaussian: Text-Driven 3D Human Generation with Gaussian Splatting
  Authors: Xian Liu, Xiaohang Zhan, Jiaxiang Tang, Ying Shan, Gang Zeng, Dahua Lin, Xihui Liu, Ziwei Liu
  Year: 2023
  ArXiv: 2311.17061
  Code: https://github.com/alvinliu0/HumanGaussian
  Project: https://alvinliu0.github.io/projects/HumanGaussian
  Tags: Diffusion
  Key: Realistic 3D human generation from text prompts is a desirable yet challenging task. Existing methods optimize 3D representations like mesh or neural fields via score distillation sampling (SDS), whic

- Title: Human Gaussian Splatting: Real-time Rendering of Animatable Avatars
  Authors: Arthur Moreau, Jifei Song, Helisa Dhamo, Richard Shaw, Yiren Zhou, Eduardo Pérez-Pellitero
  Year: 2023
  ArXiv: 2311.17113
  Project: https://perezpellitero.github.io/projects/hugs/index.html
  Key: This work addresses the problem of real-time rendering of photorealistic human body avatars learned from multi-view videos. While the classical approaches to model and render virtual humans generally

- Title: GART: Gaussian Articulated Template Models
  Authors: Jiahui Lei, Yufu Wang, Georgios Pavlakos, Lingjie Liu, Kostas Daniilidis
  Year: 2023
  ArXiv: 2311.16099
  Code: https://github.com/JiahuiLei/GART
  Project: https://www.cis.upenn.edu/~leijh/projects/gart/
  Key: We introduce Gaussian Articulated Template Model GART, an explicit, efficient, and expressive representation for non-rigid articulated subject capturing and rendering from monocular videos. GART utili

- Title: Animatable Gaussians: Learning Pose-dependent Gaussian Maps for High-fidelity Human Avatar Modeling
  Authors: Zhe Li, Zerong Zheng, Lizhen Wang, Yebin Liu
  Year: 2023
  ArXiv: 2311.16096
  Code: https://github.com/lizhe00/AnimatableGaussians
  Project: https://animatable-gaussians.github.io/
  Key: Modeling animatable human avatars from RGB videos is a long-standing and challenging problem. Recent works usually adopt MLP-based neural radiance fields (NeRF) to represent 3D humans, but it remains

- Title: SplatArmor: Articulated Gaussian splatting for animatable humans from monocular RGB videos
  Authors: Rohit Jena, Ganesh Subramanian Iyer, Siddharth Choudhary, Brandon Smith, Pratik Chaudhari, James Gee
  Year: 2023
  ArXiv: 2311.10812
  Code: https://github.com/rohitrango/splatarmor
  Project: https://jenaroh.it/splatarmor/
  Key: We propose SplatArmor, a novel approach for recovering detailed and animatable human models by `armoring' a parameterized body model with 3D Gaussians. Our approach represents the human as a set of 3D

- Title: Drivable 3D Gaussian Avatars
  Authors: Wojciech Zielonka, Timur Bagautdinov, Shunsuke Saito, Michael Zollhöfer, Justus Thies, Javier Romero
  Year: 2023
  ArXiv: 2311.08581
  Project: https://zielon.github.io/d3ga/
  Key: We present Drivable 3D Gaussian Avatars (D3GA), the first 3D controllable model for human bodies rendered with Gaussian splats. Current photorealistic drivable avatars require either accurate 3D regis

================================================================================
CATEGORY: Classic Work (1 papers)
================================================================================

- Title: Gaussian Splatting for Real-Time Radiance Field Rendering
  Authors: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, George Drettakis
  Year: 2023
  ArXiv: 2308.04079
  Code: https://github.com/graphdeco-inria/gaussian-splatting
  Project: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
  Tags: Dynamic, Rendering
  Key: Radiance Field methods have recently revolutionized novel-view synthesis of scenes captured with multiple photos or videos. However, achieving high visual quality still requires neural networks that a

================================================================================
CATEGORY: Compression (26 papers)
================================================================================

- Title: Learning Unified Representation of 3D Gaussian Splatting
  Authors: Yuelin Xin, Yuheng Liu, Xiaohui Xie, Xinke Li
  Year: 2025
  ArXiv: 2509.22917
  Code: https://github.com/cilix-ai/gs-embedding
  Project: https://cilix-ai.github.io/gs-embedding-page/
  Tags: Feed-Forward, Point Cloud, Segmentation
  Key: A well-designed vectorized representation is crucial for the learning systems natively based on 3D Gaussian Splatting. While 3DGS enables efficient and explicit 3D reconstruction, its parameter-based

- Title: Adaptive Voxelization for Transform coding of 3D Gaussian splatting data
  Authors: Chenjunjie Wang, Shashank N. Sridhara, Eduardo Pavez, Antonio Ortega, Cheng Chang
  Year: 2025
  ArXiv: 2506.00271
  Code: https://github.com/STAC-USC/3DGS_Compression_Adaptive_Voxelization
  Key: We present a novel compression framework for 3D Gaussian splatting (3DGS) data that leverages transform coding tools originally developed for point clouds. Contrary to existing 3DGS compression method

- Title: GoDe: Gaussians on Demand for Progressive Level of Detail and Scalable Compression
  Authors: Francesco Di Sario, Riccardo Renzulli, Marco Grangetto, Akihiro Sugimoto, Enzo Tartaglione
  Year: 2025
  ArXiv: 2501.13558
  Tags: LoD
  Key: 3D Gaussian Splatting enhances real-time performance in novel view synthesis by representing scenes with mixtures of Gaussians and utilizing differentiable rasterization. However, it typically require

- Title: HAC++: Towards 100X Compression of 3D Gaussian Splatting
  Authors: Yihang Chen, Qianyi Wu, Weiyao Lin, Mehrtash Harandi, Jianfei Cai
  Year: 2025
  ArXiv: 2501.12255
  Code: https://github.com/YihangChen-ee/HAC-plus
  Project: https://yihangchen-ee.github.io/project_hac++/
  Key: 3D Gaussian Splatting (3DGS) has emerged as a promising framework for novel view synthesis, boasting rapid rendering speed with high fidelity. However, the substantial Gaussians and their associated a

- Title: Object-Centric 2D Gaussian Splatting: Background Removal and Occlusion-Aware Pruning for Compact Object Models
  Authors: Marcel Rogge, Didier Stricker
  Year: 2025
  ArXiv: 2501.08174
  Tags: Densification, Editing
  Key: Current Gaussian Splatting approaches are effective for reconstructing entire scenes but lack the option to target specific objects, making them computationally expensive and unsuitable for object-spe

- Title: Locality-aware Gaussian Compression for Fast and High-quality Rendering
  Authors: Seungjoo Shin, Jaesik Park, Sunghyun Cho
  Year: 2025
  ArXiv: 2501.05757
  Key: We present LocoGS, a locality-aware 3D Gaussian Splatting (3DGS) framework that exploits the spatial coherence of 3D Gaussians for compact modeling of volumetric scenes. To this end, we first analyze

- Title: MoDec-GS: Global-to-Local Motion Decomposition and Temporal Interval Adjustment for Compact Dynamic 3D Gaussian Splatting
  Authors: Sangwoon Kwak, Joonsoo Kim, Jun Young Jeong, Won-Sik Cheong, Jihyong Oh, Munchurl Kim
  Year: 2025
  ArXiv: 2501.03714
  Project: MoDec-GS: Global-to-Local Motion Decomposition and Temporal Interval Adjustment for Compact Dynamic 3D Gaussian Splatting
  Tags: Dynamic
  Key: 3D Gaussian Splatting (3DGS) has made significant strides in scene representation and neural rendering, with intense efforts focused on adapting it for dynamic scenes. Despite delivering remarkable re

- Title: Compression of 3D Gaussian Splatting with Optimized Feature Planes and Standard Video Codecs
  Authors: Soonbin Lee, Fangwen Shu, Yago Sanchez, Thomas Schierl, Cornelius Hellge
  Year: 2025
  ArXiv: 2501.03399
  Key: 3D Gaussian Splatting is a recognized method for 3D scene representation, known for its high rendering quality and speed. However, its substantial data requirements present challenges for practical ap

- Title: 4D Gaussian Splatting: Modeling Dynamic Scenes with Native 4D Primitives
  Authors: Zeyu Yang, Zijie Pan, Xiatian Zhu, Li Zhang, Yu-Gang Jiang, Philip H. S. Torr
  Year: 2024
  ArXiv: 2412.20720
  Tags: Dynamic, Large-Scale
  Key: Dynamic 3D scene representation and novel view synthesis from captured videos are crucial for enabling immersive experiences required by AR/VR and metaverse applications. However, this task is challen

- Title: MaskGaussian: Adaptive 3D Gaussian Representation from Probabilistic Masks
  Authors: Yifei Liu, Zhihang Zhong, Yifan Zhan, Sheng Xu, Xiao Sun
  Year: 2024
  ArXiv: 2412.20522
  Code: https://github.com/kaikai23/MaskGaussian
  Tags: Densification
  Key: While 3D Gaussian Splatting (3DGS) has demonstrated remarkable performance in novel view synthesis and real-time rendering, the high memory consumption due to the use of millions of Gaussians limits i

- Title: Temporally Compressed 3D Gaussian Splatting for Dynamic Scenes
  Authors: Saqib Javed, Ahmad Jarrar Khan, Corentin Dumery, Chen Zhao, Mathieu Salzmann
  Year: 2024
  ArXiv: 2412.05700
  Project: https://ahmad-jarrar.github.io/tc-3dgs/
  Tags: Acceleration, Dynamic
  Key: Recent advancements in high-fidelity dynamic scene reconstruction have leveraged dynamic 3D Gaussians and 4D Gaussian Splatting for realistic scene representation. However, to make these methods viabl

- Title: GaussianSpa: An "Optimizing-Sparsifying" Simplification Framework for Compact and High-Quality 3D Gaussian Splatting
  Authors: Yangming Zhang, Wenqi Jia, Wei Niu, Miao Yin
  Year: 2024
  ArXiv: 2411.06019
  Project: https://gaussianspa.github.io/
  Tags: Densification
  Key: 3D Gaussian Splatting (3DGS) has emerged as a mainstream for novel view synthesis, leveraging continuous aggregations of Gaussian functions to model scene geometry. However, 3DGS suffers from substant

- Title: PRoGS: Progressive Rendering of Gaussian Splats
  Authors: Brent Zoomers, Maarten Wijnants, Ivan Molenaers, Joni Vanherck, Jeroen Put, Lode Jorissen, Nick Michiels
  Year: 2024
  ArXiv: 2409.01761
  Tags: LoD, Rendering
  Key: Over the past year, 3D Gaussian Splatting (3DGS) has received significant attention for its ability to represent 3D scenes in a perceptually accurate manner. However, it can require a substantial amou

- Title: LapisGS: Layered Progressive 3D Gaussian Splatting for Adaptive Streaming
  Authors: Yuang Shi, Simone Gasparini, Géraldine Morin, Wei Tsang Ooi,
  Year: 2024
  ArXiv: 2408.14823
  Project: https://yuang-ian.github.io/lapisgs/
  Key: The rise of Extended Reality (XR) requires efficient streaming of 3D online worlds, challenging current 3DGS representations to adapt to bandwidth-constrained environments. We propose LapisGS, a layer

- Title: Reducing the Memory Footprint of 3D Gaussian Splatting
  Authors: Panagiotis Papantonakis, Georgios Kopanas, Bernhard Kerbl, Alexandre Lanvin, George Drettakis
  Year: 2024
  ArXiv: 2406.17074
  Project: https://repo-sam.inria.fr/fungraph/reduced_3dgs/
  Key: 3D Gaussian splatting provides excellent visual quality for novel view synthesis, with fast training and realtime rendering; unfortunately, the memory requirements of this method for storing and trans

- Title: 3DGS.zip: A survey on 3D Gaussian Splatting Compression Methods
  Authors: Milena T. Bagdasarian, Paul Knoll, Florian Barthel, Anna Hilsmann, Peter Eisert, Wieland Morgenstern
  Year: 2024
  ArXiv: 2407.09510
  Project: https://w-m.github.io/3dgs-compression-survey
  Key: We present a work-in-progress survey on 3D Gaussian Splatting compression methods, focusing on their statistical performance across various benchmarks. This survey aims to facilitate comparability by

- Title: ContextGS: Compact 3D Gaussian Splatting with Anchor Level Context Model
  Authors: Yufei Wang, Zhihao Li, Lanqing Guo, Wenhan Yang, Alex C. Kot, Bihan Wen
  Year: 2024
  ArXiv: 2405.20721
  Code: https://github.com/wyf0912/ContextGS
  Key: Recently, 3D Gaussian Splatting (3DGS) has become a promising framework for novel view synthesis, offering fast rendering speeds and high fidelity. However, the large number of Gaussians and their ass

- Title: End-to-End Rate-Distortion Optimized 3D Gaussian Representation
  Authors: Henan Wang, Hanxin Zhu, Tianyu He, Runsen Feng, Jiajun Deng, Jiang Bian, Zhibo Chen
  Year: 2024
  ArXiv: 2406.01597
  Code: https://github.com/USTC-IMCL/RDO-Gaussian
  Project: https://rdogaussian.github.io/
  Key: 3D Gaussian Splatting (3DGS) has become an emerging technique with remarkable potential in 3D representation and image rendering. However, the substantial storage overhead of 3DGS significantly impede

- Title: HAC: Hash-grid Assisted Context for 3D Gaussian Splatting Compression
  Authors: Yihang Chen, Qianyi Wu, Weiyao Lin, Mehrtash Harandi, Jianfei Cai
  Year: 2024
  ArXiv: 2403.14530
  Code: https://github.com/YihangChen-ee/HAC
  Project: https://yihangchen-ee.github.io/project_hac/
  Key: 3D Gaussian Splatting (3DGS) has emerged as a promising framework for novel view synthesis, boasting rapid rendering speed with high fidelity. However, the substantial Gaussians and their associated a

- Title: GaussianImage: 1000 FPS Image Representation and Compression by 2D Gaussian Splatting
  Authors: Xinjie Zhang, Xingtong Ge, Tongda Xu, Dailan He, Yan Wang, Hongwei Qin, Guo Lu, Jing Geng, Jun Zhang
  Year: 2024
  ArXiv: 2403.08551
  Code: https://github.com/Xinjie-Q/GaussianImage
  Project: https://xingtongge.github.io/GaussianImage-page/
  Tags: 2DGS
  Key: Implicit neural representations (INRs) recently achieved great success in image representation and compression, offering high visual quality and fast rendering speeds with 10-1000 FPS, assuming suffic

- Title: Compact 3D Scene Representation via Self-Organizing Gaussian Grids
  Authors: Wieland Morgenstern, Florian Barthel, Anna Hilsmann, Peter Eisert
  Year: 2023
  ArXiv: 2312.13299
  Code: https://github.com/fraunhoferhhi/Self-Organizing-Gaussians
  Project: https://fraunhoferhhi.github.io/Self-Organizing-Gaussians/
  Key: 3D Gaussian Splatting has recently emerged as a highly promising technique for modeling of static 3D scenes. In contrast to Neural Radiance Fields, it utilizes efficient rasterization allowing for ver

- Title: Compact3D: Compressing Gaussian Splat Radiance Field Models with Vector Quantization
  Authors: KL Navaneet, Kossar Pourahmadi Meibodi, Soroush Abbasi Koohpayegani, Hamed Pirsiavash
  Year: 2023
  ArXiv: 2311.18159
  Code: https://github.com/UCDvision/compact3d
  Project: https://ucdvision.github.io/compact3d/
  Key: 3D Gaussian Splatting is a new method for modeling and rendering 3D radiance fields that achieves much faster learning and rendering time compared to SOTA NeRF methods. However, it comes with a drawba

- Title: LightGaussian: Unbounded 3D Gaussian Compression with 15x Reduction and 200+ FPS
  Authors: Zhiwen Fan, Kevin Wang, Kairun Wen, Zehao Zhu, Dejia Xu, Zhangyang Wang
  Year: 2023
  ArXiv: 2311.17245
  Code: https://github.com/VITA-Group/LightGaussian
  Project: https://lightgaussian.github.io/
  Key: Recent advancements in real-time neural rendering using point-based techniques have paved the way for the widespread adoption of 3D representations. However, foundational approaches like 3D Gaussian S

- Title: Compact 3D Gaussian Representation for Radiance Field
  Authors: Joo Chan Lee, Daniel Rho, Xiangyu Sun, Jong Hwan Ko, Eunbyung Park
  Year: 2023
  ArXiv: 2311.13681
  Code: https://github.com/maincold2/Compact-3DGS
  Project: https://maincold2.github.io/c3dgs/
  Key: Neural Radiance Fields (NeRFs) have demonstrated remarkable potential in capturing complex 3D scenes with high fidelity. However, one persistent challenge that hinders the widespread adoption of NeRFs

- Title: A Compact Dynamic 3D Gaussian Representation for Real-Time Dynamic View Synthesis
  Authors: Kai Katsumata, Duc Minh Vo, Hideki Nakayama
  Year: 2023
  ArXiv: 2311.12897
  Code: https://github.com/raven38/EfficientDynamic3DGaussian
  Project: https://compactdynamic3dgaussian.github.io/
  Tags: Dynamic
  Key: In novel view synthesis of scenes from multiple input views, 3D Gaussian splatting emerges as a viable alternative to existing radiance field approaches, delivering great visual quality and real-time

- Title: Compressed 3D Gaussian Splatting for Accelerated Novel View Synthesis
  Authors: Simon Niedermayr, Josef Stumpfegger, Rüdiger Westermann
  Year: 2024
  ArXiv: 2401.02436
  Code: https://github.com/KeKsBoTer/c3dgs
  Project: https://keksboter.github.io/c3dgs/
  Key: Recently, high-fidelity scene reconstruction with an optimized 3D Gaussian splat representation has been introduced for novel view synthesis from sparse image sets. Making such representations suitabl

================================================================================
CATEGORY: Deblurring (8 papers)
================================================================================

- Title: Deblur4DGS: 4D Gaussian Splatting from Blurry Monocular Video
  Authors: Renlong Wu, Zhilu Zhang, Mingyang Chen, Xiaopeng Fan, Zifei Yan, Wangmeng Zuo
  Year: 2024
  ArXiv: 2412.06424
  Code: https://github.com/ZcsrenlongZ/Deblur4DGS
  Project: https://deblur4dgs.github.io/
  Key: Recent 4D reconstruction methods have yielded impressive results but rely on sharp videos as supervision. However, motion blur often occurs in videos due to camera shake and object movement, while exi

- Title: DeblurGS: Gaussian Splatting for Camera Motion Blur
  Authors: Jeongtaek Oh, Jaeyoung Chung, Dongwoo Lee, Kyoung Mu Lee
  Year: 2024
  ArXiv: 2404.11358
  Tags: Rendering
  Key: Although significant progress has been made in reconstructing sharp 3D scenes from motion-blurred images, a transition to realworld applications remains challenging. The primary obstacle stems from th

- Title: SpikeNVS: Enhancing Novel View Synthesis from Blurry Images via Spike Camera
  Authors: Gaole Dai, Zhenyu Wang, Qinwen Xu, Ming Lu, Wen Chen, Boxin Shi, Shanghang Zhang, Tiejun Huang
  Year: 2024
  ArXiv: 2404.06710
  Tags: Misc
  Key: One of the most critical factors in achieving sharp Novel View Synthesis (NVS) using neural field methods like Neural Radiance Fields (NeRF) and 3D Gaussian Splatting (3DGS) is the quality of the trai

- Title: Robust Gaussian Splatting
  Authors: François Darmon, Lorenzo Porzi, Samuel Rota-Bulò, Peter Kontschieder
  Year: 2024
  ArXiv: 2404.04211
  Tags: Rendering
  Key: In this paper, we address common error sources for 3D Gaussian Splatting (3DGS) including blur, imperfect camera poses, and color inconsistencies, with the goal of improving its robustness for practic

- Title: Gaussian Splatting on the Move: Blur and Rolling Shutter Compensation for Natural Camera Motion
  Authors: Otto Seiskari, Jerry Ylilammi, Valtteri Kaatrasalo, Pekka Rantalankila, Matias Turkulainen, Juho Kannala, Esa Rahtu, Arno Solin
  Year: 2024
  ArXiv: 2403.13327
  Code: https://github.com/SpectacularAI/3dgs-deblur
  Project: https://spectacularai.github.io/3dgs-deblur/
  Tags: Rendering
  Key: High-quality scene reconstruction and novel view synthesis based on Gaussian Splatting (3DGS) typically require steady, high-quality photographs, often impractical to capture with handheld cameras. We

- Title: BAD-Gaussians: Bundle Adjusted Deblur Gaussian Splatting
  Authors: Lingzhe Zhao, Peng Wang, Peidong Liu
  Year: 2024
  ArXiv: 2403.11831
  Code: https://github.com/WU-CVGL/BAD-Gaussians/
  Project: https://lingzhezhao.github.io/BAD-Gaussians/
  Tags: Rendering
  Key: While neural rendering has demonstrated impressive capabilities in 3D scene reconstruction and novel view synthesis, it heavily relies on high-quality sharp images and accurate camera poses. Numerous

- Title: BAGS: Blur Agnostic Gaussian Splatting through Multi-Scale Kernel Modeling
  Authors: Cheng Peng, Yutao Tang, Yifan Zhou, Nengyu Wang, Xijun Liu, Deming Li, Rama Chellappa
  Year: 2024
  ArXiv: 2403.04926
  Code: https://github.com/snldmt/BAGS
  Project: https://nwang43jhu.github.io/BAGS/
  Key: Recent efforts in using 3D Gaussians for scene reconstruction and novel view synthesis can achieve impressive results on curated benchmarks; however, images captured in real life are often blurry. In

- Title: Deblurring 3D Gaussian Splatting
  Authors: Byeonghyeon Lee, Howoong Lee, Xiangyu Sun, Usman Ali, Eunbyung Park
  Year: 2023
  ArXiv: 2401.00834
  Code: https://github.com/benhenryL/Deblurring-3D-Gaussian-Splatting
  Project: https://benhenryl.github.io/Deblurring-3D-Gaussian-Splatting/
  Key: Recent studies in Radiance Fields have paved the robust way for novel view synthesis with their photorealistic rendering quality. Nevertheless, they usually employ neural networks and volumetric rende

================================================================================
CATEGORY: Densification (29 papers)
================================================================================

- Title: FastGS: Training 3D Gaussian Splatting in 100 Seconds
  Authors: Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu
  Year: 2025
  ArXiv: 2511.04283
  Code: https://github.com/fastgs/FastGS
  Project: https://fastgs.github.io/
  Tags: Acceleration, Dynamic, Sparse
  Key: The dominant 3D Gaussian splatting (3DGS) acceleration methods fail to properly regulate the number of Gaussians during training, causing redundant computational time overhead. In this paper, we propo

- Title: Sketch and Patch: Efficient 3D Gaussian Representation for Man-Made Scenes
  Authors: Yuang Shi, Simone Gasparini, Géraldine Morin, Chenggang Yang, Wei Tsang Ooi
  Year: 2025
  ArXiv: 2501.13045
  Key: 3D Gaussian Splatting (3DGS) has emerged as a promising representation for photorealistic rendering of 3D scenes. However, its high storage requirements pose significant challenges for practical appli

- Title: Object-Centric 2D Gaussian Splatting: Background Removal and Occlusion-Aware Pruning for Compact Object Models
  Authors: Marcel Rogge, Didier Stricker
  Year: 2025
  ArXiv: 2501.08174
  Tags: Compression, Editing
  Key: Current Gaussian Splatting approaches are effective for reconstructing entire scenes but lack the option to target specific objects, making them computationally expensive and unsuitable for object-spe

- Title: EasySplat: View-Adaptive Learning makes 3D Gaussian Splatting Easy
  Authors: Ao Gao, Luosong Guo, Tao Chen, Zhao Wang, Ying Tai, Jian Yang, Zhenyu Zhang
  Year: 2025
  ArXiv: 2501.01003
  Tags: 3ster-based, Acceleration, Rendering
  Key: 3D Gaussian Splatting (3DGS) techniques have achieved satisfactory 3D scene representation. Despite their impressive performance, they confront challenges due to the limitation of structure-from-motio

- Title: MaskGaussian: Adaptive 3D Gaussian Representation from Probabilistic Masks
  Authors: Yifei Liu, Zhihang Zhong, Yifan Zhan, Sheng Xu, Xiao Sun
  Year: 2024
  ArXiv: 2412.20522
  Code: https://github.com/kaikai23/MaskGaussian
  Tags: Compression
  Key: While 3D Gaussian Splatting (3DGS) has demonstrated remarkable performance in novel view synthesis and real-time rendering, the high memory consumption due to the use of millions of Gaussians limits i

- Title: Turbo-GS: Accelerating 3D Gaussian Fitting for High-Quality Radiance Fields
  Authors: Tao Lu, Ankit Dhiman, R Srinath, Emre Arslan, Angela Xing, Yuanbo Xiangli, R Venkatesh Babu, Srinath Sridhar
  Year: 2024
  ArXiv: 2412.13547
  Project: https://ivl.cs.brown.edu/research/turbo-gs
  Tags: Acceleration
  Key: Novel-view synthesis is an important problem in computer vision with applications in 3D reconstruction, mixed reality, and robotics. Recent methods like 3D Gaussian Splatting (3DGS) have become the pr

- Title: Faster and Better 3D Splatting via Group Training
  Authors: Chengbo Wang, Guozheng Ma, Yifei Xue, Yizhen Lao
  Year: 2024
  Code: https://github.com/Chengbo-Wang/3DGS-with-Group-Training
  Project: https://chengbo-wang.github.io/3DGS-with-Group-Training/
  Paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Wang_Faster_and_Better_3D_Splatting_via_Group_Training_ICCV_2025_paper.pdf
  Tags: Acceleration, Optimization
  Key: 3D Gaussian Splatting (3DGS) has emerged as a powerful technique for novel view synthesis, demonstrating remarkable capability in high-fidelity scene reconstruction through its Gaussian primitive repr

- Title: ResGS: Residual Densification of 3D Gaussian for Efficient Detail Recovery
  Authors: Yanzhe Lyu, Kai Cheng, Xin Kang, Xuejin Chen
  Year: 2024
  ArXiv: 2412.07494
  Key: Recently, 3D Gaussian Splatting (3D-GS) has prevailed in novel view synthesis, achieving high fidelity and efficiency. However, it often struggles to capture rich details and complete geometry. Our an

- Title: 4D Gaussian Splatting with Scale-aware Residual Field and Adaptive Optimization for Real-time Rendering of Temporally Complex Dynamic Scenes
  Authors: Jinbo Yan, Rui Peng, Luyang Tang, Ronggang Wang
  Year: 2024
  ArXiv: 2412.06299
  Code: https://github.com/yjb6/SaRO-GS
  Project: https://yjb6.github.io/SaRO-GS.github.io/
  Tags: Dynamic, Optimization
  Key: Reconstructing dynamic scenes from video sequences is a highly promising task in the multimedia domain. While previous methods have made progress, they often struggle with slow rendering and managing

- Title: Mini-Splatting2: Building 360 Scenes within Minutes via Aggressive Gaussian Densification
  Authors: Guangchi Fang, Bing Wang
  Year: 2024
  ArXiv: 2411.12788
  Code: https://github.com/fatPeter/mini-splatting2
  Tags: Acceleration
  Key: In this study, we explore the essential challenge of fast scene optimization for Gaussian Splatting. Through a thorough analysis of the geometry modeling process, we reveal that dense point clouds can

- Title: GaussianSpa: An "Optimizing-Sparsifying" Simplification Framework for Compact and High-Quality 3D Gaussian Splatting
  Authors: Yangming Zhang, Wenqi Jia, Wei Niu, Miao Yin
  Year: 2024
  ArXiv: 2411.06019
  Project: https://gaussianspa.github.io/
  Tags: Compression
  Key: 3D Gaussian Splatting (3DGS) has emerged as a mainstream for novel view synthesis, leveraging continuous aggregations of Gaussian functions to model scene geometry. However, 3DGS suffers from substant

- Title: SuperGS: Super-Resolution 3D Gaussian Splatting via Latent Feature Field and Gradient-guided Splitting
  Authors: Shiyun Xie, Zhiru Wang, Yinghao Zhu, Chengwei Pan
  Year: 2024
  ArXiv: 2410.02571
  Tags: Feed-Forward, Rendering
  Key: Recently, 3D Gaussian Splatting (3DGS) has exceled in novel view synthesis with its real-time rendering capabilities and superior quality. However, it faces challenges for high-resolution novel view s

- Title: Taming 3DGS: High-Quality Radiance Fields with Limited Resources
  Authors: Saswat Subhajyoti Mallick, Rahul Goel, Bernhard Kerbl, Francisco Vicente Carrasco, Markus Steinberger, Fernando De La Torre
  Year: 2024
  ArXiv: 2406.15643
  Code: https://github.com/humansensinglab/taming-3dgs
  Project: https://humansensinglab.github.io/taming-3dgs/
  Tags: Acceleration
  Key: 3D Gaussian Splatting (3DGS) has transformed novel-view synthesis with its fast, interpretable, and high-fidelity rendering. However, its resource requirements limit its usability. Especially on const

- Title: Effective Rank Analysis and Regularization for Enhanced 3D Gaussian Splatting
  Authors: Junha Hyung, Susung Hong, Sungwon Hwang, Jaeseong Lee, Jaegul Choo, Jin-Hwa Kim
  Year: 2024
  ArXiv: 2406.11672
  Project: https://junhahyung.github.io/erankgs.github.io/
  Tags: Meshing
  Key: 3D reconstruction from multi-view images is one of the fundamental challenges in computer vision and graphics. Recently, 3D Gaussian Splatting (3DGS) has emerged as a promising technique capable of re

- Title: PUP 3D-GS: Principled Uncertainty Pruning for 3D Gaussian Splatting
  Authors: Alex Hanson, Allen Tu, Vasu Singla, Mayuka Jayawardhana, Matthias Zwicker, Tom Goldstein
  Year: 2024
  ArXiv: 2406.10219
  Code: https://github.com/j-alex-hanson/gaussian-splatting-pup
  Project: https://pup3dgs.github.io/
  Key: Recent advances in novel view synthesis have enabled real-time rendering speeds with high reconstruction accuracy. 3D Gaussian Splatting (3D-GS), a foundational point-based parametric 3D scene represe

- Title: Trim 3D Gaussian Splatting for Accurate Geometry Representation
  Authors: Lue Fan, Yuxue Yang, Minxing Li, Hongsheng Li, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2406.07499
  Code: https://github.com/YuxueYang1204/TrimGS
  Project: https://trimgs.github.io/
  Tags: 2DGS
  Key: In this paper, we introduce Trim 3D Gaussian Splatting (TrimGS) to reconstruct accurate 3D geometry from images. Previous arts for geometry reconstruction from 3D Gaussians mainly focus on exploring s

- Title: 3D Gaussian Splatting as Markov Chain Monte Carlo
  Authors: Shakiba Kheradmand, Daniel Rebain, Gopal Sharma, Weiwei Sun, Jeff Tseng, Hossam Isack, Abhishek Kar, Andrea Tagliasacchi, Kwang Moo Yi
  Year: 2024
  ArXiv: 2404.09591
  Code: https://github.com/ubc-vision/3dgs-mcmc
  Project: https://ubc-vision.github.io/3dgs-mcmc/
  Key: While 3D Gaussian Splatting has recently become popular for neural rendering, current methods rely on carefully engineered cloning and splitting strategies for placing Gaussians, which can lead to poo

- Title: Revising Densification in Gaussian Splatting
  Authors: Samuel Rota Bulò, Lorenzo Porzi, Peter Kontschieder
  Year: 2024
  ArXiv: 2404.06109
  Key: In this paper, we address the limitations of Adaptive Density Control (ADC) in 3D Gaussian Splatting (3DGS), a scene representation method achieving high-quality, photorealistic results for novel view

- Title: HO-Gaussian: Hybrid Optimization of 3D Gaussian Splatting for Urban Scenes
  Authors: Zhuopeng Li, Yilin Zhang, Chenming Wu, Jianke Zhu, Liangjun Zhang
  Year: 2024
  ArXiv: 2403.20032
  Tags: Misc
  Key: The rapid growth of 3D Gaussian Splatting (3DGS) has revolutionized neural rendering, enabling real-time production of high-quality renderings. However, the previous 3DGS-based methods have limitation

- Title: Pixel-GS: Density Control with Pixel-aware Gradient for 3D Gaussian Splatting
  Authors: Zheng Zhang, Wenbo Hu, Yixing Lao, Tong He, Hengshuang Zhao
  Year: 2024
  ArXiv: 2403.15530
  Code: https://github.com/zhengzhang01/Pixel-GS
  Project: https://pixelgs.github.io/
  Tags: Rendering
  Key: 3D Gaussian Splatting (3DGS) has demonstrated impressive novel view synthesis results while advancing real-time rendering performance. However, it relies heavily on the quality of the initial point cl

- Title: Mini-Splatting: Representing Scenes with a Constrained Number of Gaussians
  Authors: Guangchi Fang, Bing Wang
  Year: 2024
  ArXiv: 2403.14166
  Code: https://github.com/fatPeter/mini-splatting
  Tags: Rendering
  Key: In this study, we explore the challenge of efficiently representing scenes with a constrained number of Gaussians. Our analysis shifts from traditional graphics and 2D computer vision to the perspecti

- Title: RadSplat: Radiance Field-Informed Gaussian Splatting for Robust Real-Time Rendering with 900+ FPS
  Authors: Michael Niemeyer, Fabian Manhardt, Marie-Julie Rakotosaona, Michael Oechsle, Daniel Duckworth, Rama Gosula, Keisuke Tateno, John Bates, Dominik Kaeser, Federico Tombari
  Year: 2024
  ArXiv: 2403.13806
  Project: https://m-niemeyer.github.io/radsplat/
  Tags: Misc, Rendering
  Key: Recent advances in view synthesis and real-time rendering have achieved photorealistic quality at impressive rendering speeds. While Radiance Field-based methods achieve state-of-the-art quality in ch

- Title: GeoGaussian: Geometry-aware Gaussian Splatting for Scene Rendering
  Authors: Yanyan Li, Chenyu Lyu, Yan Di, Guangyao Zhai, Gim Hee Lee, Federico Tombari
  Year: 2024
  ArXiv: 2403.11324
  Code: https://github.com/yanyan-li/GeoGaussian
  Project: https://yanyan-li.github.io/project/gs/geogaussian
  Tags: Rendering
  Key: During the Gaussian Splatting optimization process, the scene's geometry can gradually deteriorate if its structure is not deliberately preserved, especially in non-textured regions such as walls, cei

- Title: RAIN-GS: Relaxing Accurate Initialization Constraint for 3D Gaussian Splatting
  Authors: Jaewoo Jung, Jisang Han, Honggyu An, Jiwon Kang, Seonghoon Park, Seungryong Kim
  Year: 2024
  ArXiv: 2403.09413
  Code: https://github.com/cvlab-kaist/RAIN-GS
  Project: https://ku-cvlab.github.io/RAIN-GS/
  Tags: Rendering
  Key: 3D Gaussian splatting (3DGS) has recently demonstrated impressive capabilities in real-time novel view synthesis and 3D reconstruction. However, 3DGS heavily depends on the accurate initialization der

- Title: A New Split Algorithm for 3D Gaussian Splatting
  Authors: Qiyuan Feng, Gengchen Cao, Haoxiang Chen, Tai-Jiang Mu, Ralph R. Martin, Shi-Min Hu
  Year: 2024
  ArXiv: 2403.09143
  Key: 3D Gaussian splatting models, as a novel explicit 3D representation, have been applied in many domains recently, such as explicit geometric editing and geometry generation. Progress has been rapid. Ho

- Title: FreGS: 3D Gaussian Splatting with Progressive Frequency Regularization
  Authors: Jiahui Zhang, Fangneng Zhan, Muyu Xu, Shijian Lu, Eric Xing
  Year: 2024
  ArXiv: 2403.06908
  Key: 3D Gaussian splatting has achieved very impressive performance in real-time novel view synthesis. However, it often suffers from over-reconstruction during Gaussian densification where high-variance i

- Title: GaussianPro: 3D Gaussian Splatting with Progressive Propagation
  Authors: Kai Cheng, Xiaoxiao Long, Kaizhi Yang, Yao Yao, Wei Yin, Yuexin Ma, Wenping Wang, Xuejin Chen
  Year: 2024
  ArXiv: 2402.14650
  Code: https://github.com/kcheng1021/GaussianPro
  Project: https://kcheng1021.github.io/gaussianpro.github.io/
  Key: The advent of 3D Gaussian Splatting (3DGS) has recently brought about a revolution in the field of neural rendering, facilitating high-quality renderings at real-time speed. However, 3DGS heavily depe

- Title: EAGLES: Efficient Accelerated 3D Gaussians with Lightweight EncodingS
  Authors: Sharath Girish, Kamal Gupta, Abhinav Shrivastava
  Year: 2023
  ArXiv: 2312.04564
  Code: https://github.com/Sharath-girish/efficientgaussian
  Project: https://efficientgaussian.github.io/
  Tags: Acceleration
  Key: Recently, 3D Gaussian splatting (3D-GS) has gained popularity in novel-view scene synthesis. It addresses the challenges of lengthy training times and slow rendering speeds associated with Neural Radi

- Title: Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering
  Authors: Tao Lu, Mulin Yu, Linning Xu, Yuanbo Xiangli, Limin Wang, Dahua Lin, Bo Dai
  Year: 2023
  ArXiv: 2312.00109
  Code: https://github.com/city-super/Scaffold-GS
  Project: https://city-super.github.io/scaffold-gs/
  Tags: Rendering
  Key: Neural rendering methods have significantly advanced photo-realistic 3D scene rendering in various academic and industrial applications. The recent 3D Gaussian Splatting method has achieved the state-

================================================================================
CATEGORY: Diffusion (55 papers)
================================================================================

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Dynamic, Feed-Forward, Gaussian Video, Virtual Reality, World Generation
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: Zero-Shot Novel View and Depth Synthesis with Multi-View Geometric Diffusion
  Authors: Vitor Guizilini, Muhammad Zubair Irshad, Dian Chen, Greg Shakhnarovich, Rares Ambrus
  Year: 2025
  ArXiv: 2501.18804
  Project: https://mvgd.github.io/
  Tags: 360 degree, Feed-Forward, Large-Scale, Point Cloud
  Key: Current methods for 3D scene reconstruction from sparse posed images employ intermediate 3D representations such as neural fields, voxel grids, or 3D Gaussians, to achieve multi-view consistent scene

- Title: DiffSplat: Repurposing Image Diffusion Models for Scalable Gaussian Splat Generation
  Authors: Chenguo Lin, Panwang Pan, Bangbang Yang, Zeming Li, Yadong Mu
  Year: 2025
  ArXiv: 2501.16764
  Code: https://github.com/chenguolin/DiffSplat
  Project: https://chenguolin.github.io/projects/DiffSplat/
  Key: Recent advancements in 3D content generation from text or a single image struggle with limited high-quality 3D datasets and inconsistency from 2D multi-view generation. We introduce DiffSplat, a novel

- Title: MEt3R: Measuring Multi-View Consistency in Generated Images
  Authors: Mohammad Asim, Christopher Wewer, Thomas Wimmer, Bernt Schiele, Jan Eric Lenssen
  Year: 2025
  ArXiv: 2501.06336
  Code: https://github.com/mohammadasim98/MEt3R
  Project: https://geometric-rl.mpi-inf.mpg.de/met3r/
  Tags: 3ster-based
  Key: We introduce MEt3R, a metric for multi-view consistency in generated images. Large-scale generative models for multi-view image generation are rapidly advancing the field of 3D inference from sparse o

- Title: Consistent Flow Distillation for Text-to-3D Generation
  Authors: Runjie Yan, Yinbo Chen, Xiaolong Wang
  Year: 2025
  ArXiv: 2501.05445
  Code: https://github.com/runjie-yan/ConsistentFlowDistillation
  Project: https://runjie-yan.github.io/cfd/
  Key: Score Distillation Sampling (SDS) has made significant strides in distilling image-generative models for 3D generation. However, its maximum-likelihood-seeking behavior often leads to degraded visual

- Title: Zero-1-to-G: Taming Pretrained 2D Diffusion Model for Direct 3D Generation
  Authors: Xuyi Meng, Chen Wang, Jiahui Lei, Kostas Daniilidis, Jiatao Gu, Lingjie Liu
  Year: 2025
  ArXiv: 2501.05427
  Project: https://mengxuyigit.github.io/projects/zero-1-to-G/
  Key: Recent advances in 2D image generation have achieved remarkable quality,largely driven by the capacity of diffusion models and the availability of large-scale datasets. However, direct 3D generation i

- Title: Arc2Avatar: Generating Expressive 3D Avatars from a Single Image via ID Guidance
  Authors: Dimitrios Gerogiannis, Foivos Paraperas Papantoniou, Rolandos Alexandros Potamias, Alexandros Lattas, Stefanos Zafeiriou
  Year: 2025
  ArXiv: 2501.05379
  Tags: Avatar
  Key: Inspired by the effectiveness of 3D Gaussian Splatting (3DGS) in reconstructing detailed 3D scenes within multi-view setups and the emergence of large 2D human foundation models, we introduce Arc2Avat

- Title: Pointmap-Conditioned Diffusion for Consistent Novel View Synthesis
  Authors: Thang-Anh-Quan Nguyen, Nathan Piasco, Luis Roldão, Moussab Bennehar, Dzmitry Tsishkou, Laurent Caraffa, Jean-Philippe Tarel, Roland Brémond
  Year: 2025
  ArXiv: 2501.02913
  Key: In this paper, we present PointmapDiffusion, a novel framework for single-image novel view synthesis (NVS) that utilizes pre-trained 2D diffusion models. Our method is the first to leverage pointmaps

- Title: VideoLifter: Lifting Videos to 3D with Fast Hierarchical Stereo Alignment
  Authors: Wenyan Cong, Kevin Wang, Jiahui Lei, Colton Stearns, Yuanhao Cai, Dilin Wang, Rakesh Ranjan, Matt Feiszli, Leonidas Guibas, Zhangyang Wang, Weiyao Wang, Zhiwen Fan
  Year: 2025
  ArXiv: 2501.01949
  Code: https://github.com/VITA-Group/VideoLifter
  Project: https://videolifter.github.io/
  Tags: Acceleration
  Key: Efficiently reconstructing accurate 3D models from monocular video is a key challenge in computer vision, critical for advancing applications in virtual reality, robotics, and scene understanding. Exi

- Title: SimAvatar: Simulation-Ready Avatars with Layered Hair and Clothing
  Authors: Xueting Li, Ye Yuan, Shalini De Mello, Gilles Daviet, Jonathan Leaf, Miles Macklin, Jan Kautz, Umar Iqbal
  Year: 2024
  ArXiv: 2412.09545
  Project: https://nvlabs.github.io/SimAvatar/
  Tags: Avatar, Language Embedding
  Key: We introduce SimAvatar, a framework designed to generate simulation-ready clothed 3D human avatars from a text prompt. Current text-driven human avatar generation methods either model hair, clothing,

- Title: Diffusion-Based Attention Warping for Consistent 3D Scene Editing
  Authors: Eyal Gomel, Lior Wolf
  Year: 2024
  ArXiv: 2412.07984
  Project: https://attention-warp.github.io/
  Tags: Style Transfer
  Key: We present a novel method for 3D scene editing using diffusion models, designed to ensure view consistency and realism across perspectives. Our approach leverages attention features extracted from a s

- Title: Gaussians-to-Life: Text-Driven Animation of 3D Gaussian Splatting Scenes
  Authors: Thomas Wimmer, Michael Oechsle, Michael Niemeyer, Federico Tombari
  Year: 2024
  ArXiv: 2411.19233
  Code: https://github.com/wimmerth/gaussians2life
  Project: https://wimmerth.github.io/gaussians2life.html
  Tags: Dynamic
  Key: State-of-the-art novel view synthesis methods achieve impressive results for multi-view captures of static 3D scenes. However, the reconstructed scenes still lack "liveliness," a key component for cre

- Title: CAT4D: Create Anything in 4D with Multi-View Video Diffusion Models
  Authors: Rundi Wu, Ruiqi Gao, Ben Poole, Alex Trevithick, Changxi Zheng, Jonathan T. Barron, Aleksander Holynski
  Year: 2024
  ArXiv: 2411.18613
  Project: https://cat-4d.github.io/
  Tags: Dynamic
  Key: We present CAT4D, a method for creating 4D (dynamic 3D) scenes from monocular video. CAT4D leverages a multi-view video diffusion model trained on a diverse combination of datasets to enable novel vie

- Title: DiffGS: Functional Gaussian Splatting Diffusion
  Authors: Junsheng Zhou, Weiqi Zhang, Yu-Shen Liu
  Year: 2024
  ArXiv: 2410.19657
  Code: https://github.com/weiqi-zhang/DiffGS
  Project: https://junshengzhou.github.io/DiffGS/
  Key: 3D Gaussian Splatting (3DGS) has shown convincing performance in rendering speed and fidelity, yet the generation of Gaussian Splatting remains a challenge due to its discreteness and unstructured nat

- Title: PSHuman: Photorealistic Single-view Human Reconstruction using Cross-Scale Diffusion
  Authors: Peng Li, Wangguandong Zheng, Yuan Liu, Tao Yu, Yangguang Li, Xingqun Qi, Mengfei Li, Xiaowei Chi, Siyu Xia, Wei Xue, Wenhan Luo, Qifeng Liu, Yike Guo
  Year: 2024
  ArXiv: 2409.10141
  Code: https://github.com/pengHTYX/PSHuman
  Project: https://penghtyx.github.io/PSHuman/
  Tags: Avatar, Meshing
  Key: Detailed and photorealistic 3D human modeling is essential for various applications and has seen tremendous progress. However, full-body reconstruction from a monocular RGB image remains challenging d

- Title: 4Real: Towards Photorealistic 4D Scene Generation via Video Diffusion Models
  Authors: Heng Yu, Chaoyang Wang, Peiye Zhuang, Willi Menapace, Aliaksandr Siarohin, Junli Cao, Laszlo A Jeni, Sergey Tulyakov, Hsin-Ying Lee
  Year: 2024
  ArXiv: 2406.07472
  Project: https://snap-research.github.io/4Real/
  Key: Existing dynamic scene generation methods mostly rely on distilling knowledge from pre-trained 3D generative models, which are typically fine-tuned on synthetic object datasets. As a result, the gener

- Title: RealmDreamer: Text-Driven 3D Scene Generation with Inpainting and Depth Diffusion
  Authors: Jaidev Shriram, Alex Trevithick, Lingjie Liu, Ravi Ramamoorthi
  Year: 2024
  ArXiv: 2404.07199
  Project: https://realmdreamer.github.io/
  Key: We introduce RealmDreamer, a technique for generation of general forward-facing 3D scenes from text descriptions. Our technique optimizes a 3D Gaussian Splatting representation to match complex text p

- Title: DreamScene360: Unconstrained Text-to-3D Scene Generation with Panoramic Gaussian Splatting
  Authors: Shijie Zhou, Zhiwen Fan, Dejia Xu, Haoran Chang, Pradyumna Chari, Tejas Bharadwaj, Suya You, Zhangyang Wang, Achuta Kadambi
  Year: 2024
  ArXiv: 2404.06903
  Code: https://github.com/ShijieZhou-UCLA/DreamScene360
  Project: https://dreamscene360.github.io/
  Key: The increasing demand for virtual reality applications has highlighted the significance of crafting immersive 3D assets. We present a text-to-3D 360∘ scene generation pipeline that facilitates the cre

- Title: Zero-shot Point Cloud Completion Via 2D Priors
  Authors: Tianxin Huang, Zhiwen Yan, Yuyang Zhao, Gim Hee Lee
  Year: 2024
  ArXiv: 2404.06814
  Tags: Point Cloud
  Key: 3D point cloud completion is designed to recover complete shapes from partially observed point clouds. Conventional completion methods typically depend on extensive point cloud data for training %, wi

- Title: Hash3D: Training-free Acceleration for 3D Generation
  Authors: Xingyi Yang, Xinchao Wang
  Year: 2024
  ArXiv: 2404.06091
  Code: https://github.com/Adamdad/hash3D
  Project: https://adamdad.github.io/hash3D/
  Tags: Acceleration
  Key: The evolution of 3D generative modeling has been notably propelled by the adoption of 2D diffusion models. Despite this progress, the cumbersome optimization process per se presents a critical hurdle

- Title: SC4D: Sparse-Controlled Video-to-4D Generation and Motion Transfer
  Authors: Zijie Wu, Chaohui Yu, Yanqin Jiang, Chenjie Cao, Fan Wang, Xiang Bai
  Year: 2024
  ArXiv: 2404.03736
  Code: https://github.com/JarrentWu1031/SC4D
  Project: https://sc4d.github.io/
  Key: Recent advances in 2D/3D generative models enable the generation of dynamic 3D objects from a single-view video. Existing approaches utilize score distillation sampling to form the dynamic scene as dy

- Title: DreamScene: 3D Gaussian-based Text-to-3D Scene Generation via Formation Pattern Sampling
  Authors: Haoran Li, Haolin Shi, Wenli Zhang, Wenjun Wu, Yong Liao, Lin Wang, Lik Hang Lee, Pengyuan Zhou
  Year: 2024
  ArXiv: 2404.03575
  Code: https://github.com/DreamScene-Project/DreamScene
  Project: https://dreamscene-project.github.io/
  Key: Text-to-3D scene generation holds immense potential for the gaming, film, and architecture sectors, increasingly capturing the attention of both academic and industry circles. Despite significant prog

- Title: SGD: Street View Synthesis with Gaussian Splatting and Diffusion Prior
  Authors: Zhongrui Yu, Haoran Wang, Jinze Yang, Hanzhang Wang, Zeke Xie, Yunfeng Cai, Jiale Cao, Zhong Ji, Mingming Sun
  Year: 2024
  ArXiv: 2403.20079
  Tags: Lidar, Sparse
  Key: Novel View Synthesis (NVS) for street scenes play a critical role in the autonomous driving simulation. The current mainstream technique to achieve it is neural rendering, such as Neural Radiance Fiel

- Title: GaussianCube: A Structured and Explicit Radiance Representation for 3D Generative Modeling
  Authors: Bowen Zhang, Yiji Cheng, Jiaolong Yang, Chunyu Wang, Feng Zhao, Yansong Tang, Dong Chen, Baining Guo
  Year: 2024
  ArXiv: 2403.19655
  Code: https://github.com/GaussianCube/GaussianCube
  Project: https://gaussiancube.github.io/
  Key: We introduce a radiance representation that is both structured and fully explicit and thus greatly facilitates 3D generative modeling. Existing radiance representations either require an implicit feat

- Title: DreamPolisher: Towards High-Quality Text-to-3D Generation via Geometric Diffusion
  Authors: Yuanze Lin, Ronald Clark, Philip Torr
  Year: 2024
  ArXiv: 2403.17237
  Code: https://github.com/yuanze-lin/DreamPolisher
  Project: https://yuanze-lin.me/DreamPolisher_page/
  Key: We present DreamPolisher, a novel Gaussian Splatting based method with geometric guidance, tailored to learn cross-view consistency and intricate detail from textual descriptions. While recent progres

- Title: Comp4D: LLM-Guided Compositional 4D Scene Generation
  Authors: Dejia Xu, Hanwen Liang, Neel P. Bhatt, Hezhen Hu, Hanxue Liang, Konstantinos N. Plataniotis, Zhangyang Wang
  Year: 2024
  ArXiv: 2403.16993
  Code: https://github.com/VITA-Group/Comp4D
  Project: https://vita-group.github.io/Comp4D/
  Key: Recent advancements in diffusion models for 2D and 3D content creation have sparked a surge of interest in generating 4D content. However, the scarcity of 3D scene datasets constrains current methodol

- Title: STAG4D: Spatial-Temporal Anchored Generative 4D Gaussians
  Authors: Yifei Zeng, Yanqin Jiang, Siyu Zhu, Yuanxun Lu, Youtian Lin, Hao Zhu, Weiming Hu, Xun Cao, Yao Yao
  Year: 2024
  ArXiv: 2403.14939
  Code: https://github.com/zeng-yifei/STAG4D
  Project: https://nju-3dv.github.io/projects/STAG4D/
  Key: Recent progress in pre-trained diffusion models and 3D generation have spurred interest in 4D content creation. However, achieving high-fidelity 4D generation with spatial-temporal consistency remains

- Title: SyncTweedies: A General Generative Framework Based on Synchronized Diffusions
  Authors: Jaihoon Kim, Juil Koo, Kyeongmin Yeo, Minhyuk Sung
  Year: 2024
  ArXiv: 2403.14370
  Code: https://github.com/KAIST-Visual-AI-Group/SyncTweedies
  Project: https://synctweedies.github.io/
  Key: We introduce a general framework for generating diverse visual content, including ambiguous images, panorama images, mesh textures, and Gaussian splat textures, by synchronizing multiple diffusion pro

- Title: GVGEN: Text-to-3D Generation with Volumetric Representation
  Authors: Xianglong He, Junyi Chen, Sida Peng, Di Huang, Yangguang Li, Xiaoshui Huang, Chun Yuan, Wanli Ouyang, Tong He
  Year: 2024
  ArXiv: 2403.12957
  Code: https://github.com/GVGEN/GVGEN
  Project: https://gvgen.github.io/
  Key: In recent years, 3D Gaussian splatting has emerged as a powerful technique for 3D reconstruction and generation, known for its fast and high-quality rendering capabilities. To address these shortcomin

- Title: BAGS: Building Animatable Gaussian Splatting from a Monocular Video with Diffusion Priors
  Authors: Tingyang Zhang, Qingzhe Gao, Weiyu Li, Libin Liu, Baoquan Chen
  Year: 2024
  ArXiv: 2403.11427
  Code: https://github.com/Michaelszj/bags
  Tags: Dynamic, Monocular
  Key: Animatable 3D reconstruction has significant applications across various fields, primarily relying on artists' handcraft creation. Recently, some studies have successfully constructed animatable 3D mo

- Title: BrightDreamer: Generic 3D Gaussian Generative Framework for Fast Text-to-3D Synthesis
  Authors: Lutao Jiang, Lin Wang
  Year: 2024
  ArXiv: 2403.11273
  Code: https://github.com/lutao2021/BrightDreamer
  Project: https://vlislab22.github.io/BrightDreamer/
  Key: Text-to-3D synthesis has recently seen intriguing advances by combining the text-to-image models with 3D representation methods, e.g., Gaussian Splatting (GS), via Score Distillation Sampling (SDS). H

- Title: FDGaussian: Fast Gaussian Splatting from Single Image via Geometric-aware Diffusion Model
  Authors: Qijun Feng, Zhen Xing, Zuxuan Wu, Yu-Gang Jiang
  Year: 2024
  ArXiv: 2403.10242
  Key: Reconstructing detailed 3D objects from single-view images remains a challenging task due to the limited information available. In this paper, we introduce FDGaussian, a novel two-stage framework for

- Title: Controllable Text-to-3D Generation via Surface-Aligned Gaussian Splatting
  Authors: Zhiqi Li, Yiming Chen, Lingzhe Zhao, Peidong Liu
  Year: 2024
  ArXiv: 2403.09981
  Code: https://github.com/WU-CVGL/MVControl-threestudio
  Project: https://lizhiqi49.github.io/MVControl/
  Key: While text-to-3D and image-to-3D generation tasks have received considerable attention, one important but under-explored field between them is controllable text-to-3D generation, which we mainly focus

- Title: Hyper-3DG:Text-to-3D Gaussian Generation via Hypergraph
  Authors: Donglin Di, Jiahui Yang, Chaofan Luo, Zhou Xue, Wei Chen, Xun Yang, Yue Gao
  Year: 2024
  ArXiv: 2403.09236
  Key: Text-to-3D generation represents an exciting field that has seen rapid advancements, facilitating the transformation of textual descriptions into detailed 3D models. However, current progress often ne

- Title: GaussianObject: Just Taking Four Images to Get A High-Quality 3D Object with Gaussian Splatting
  Authors: Chen Yang, Sikuang Li, Jiemin Fang, Ruofan Liang, Lingxi Xie, Xiaopeng Zhang, Wei Shen, Qi Tian
  Year: 2024
  ArXiv: 2402.10259
  Code: https://github.com/GaussianObject/GaussianObject
  Project: https://gaussianobject.github.io/
  Key: Reconstructing and rendering 3D objects from highly sparse views is of critical importance for promoting applications of 3D vision techniques and improving user experience. However, images from sparse

- Title:  IM-3D: Iterative Multiview Diffusion and Reconstruction for High-Quality 3D Generation
  Authors: Luke Melas-Kyriazi, Iro Laina, Christian Rupprecht, Natalia Neverova, Andrea Vedaldi, Oran Gafni, Filippos Kokkinos
  Year: 2024
  ArXiv: 2402.08682
  Project: https://lukemelas.github.io/IM-3D/
  Key: Most text-to-3D generators build upon off-the-shelf text-to-image models trained on billions of images. They use variants of Score Distillation Sampling (SDS), which is slow, somewhat unstable, and pr

- Title: GALA3D: Towards Text-to-3D Complex Scene Generation via Layout-guided Generative Gaussian Splatting
  Authors: Xiaoyu Zhou, Xingjian Ran, Yajiao Xiong, Jinlin He, Zhiwei Lin, Yongtao Wang, Deqing Sun, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2402.07207
  Project: https://gala3d.github.io/
  Key: We present GALA3D, generative 3D GAussians with LAyout-guided control, for effective compositional text-to-3D generation. We first utilize large language models (LLMs) to generate the initial layout a

- Title: Large Multi-View Gaussian Model for High-Resolution 3D Content Creation
  Authors: Chen Yang, Sikuang Li, Jiemin Fang, Ruofan Liang, Lingxi Xie, Xiaopeng Zhang, Wei Shen, Qi Tian
  Year: 2024
  ArXiv: 2402.05054
  Code: https://github.com/3DTopia/LGM
  Project: https://me.kiui.moe/lgm/
  Key: 3D content creation has achieved significant progress in terms of both quality and speed. Although current feed-forward models can produce 3D objects in seconds, their resolution is constrained by the

- Title: Fast Dynamic 3D Object Generation from a Single-view Video
  Authors: Zijie Pan, Zeyu Yang, Xiatian Zhu, Li Zhang
  Year: 2024
  ArXiv: 2401.08742
  Code: https://github.com/fudan-zvg/Efficient4D
  Project: https://fudan-zvg.github.io/Efficient4D/
  Key: Generating dynamic three-dimensional (3D) object from a single-view video is challenging due to the lack of 4D labeled data. Existing methods extend text-to-3D pipelines by transferring off-the-shelf

- Title: AGG: Amortized Generative 3D Gaussians for Single Image to 3D
  Authors: Dejia Xu, Ye Yuan, Morteza Mardani, Sifei Liu, Jiaming Song, Zhangyang Wang, Arash Vahdat
  Year: 2024
  ArXiv: 2401.04099
  Project: https://ir1d.github.io/AGG/
  Key: Given the growing need for automatic 3D content creation pipelines, various 3D representations have been studied to generate 3D objects from a single image. Due to its superior rendering efficiency, 3

- Title: 4DGen: Grounded 4D Content Generation with Spatial-temporal Consistency
  Authors: Yuyang Yin, Dejia Xu, Zhangyang Wang, Yao Zhao, Yunchao Wei
  Year: 2023
  ArXiv: 2312.17225
  Code: https://github.com/VITA-Group/4DGen
  Project: https://vita-group.github.io/4DGen/
  Key: Aided by text-to-image and text-to-video diffusion models, existing 4D content creation pipelines utilize score distillation sampling to optimize entire dynamic 3D scene. However, as these pipelines g

- Title: DreamGaussian4D: Generative 4D Gaussian Splatting
  Authors: Jiawei Ren, Liang Pan, Jiaxiang Tang, Chi Zhang, Ang Cao, Gang Zeng, Ziwei Liu
  Year: 2023
  ArXiv: 2312.17142
  Code: https://github.com/jiawei-ren/dreamgaussian4d
  Project: https://jiawei-ren.github.io/projects/dreamgaussian4d/
  Key: Remarkable progress has been made in 4D content generation recently. However, existing methods suffer from long optimization time, lack of motion controllability, and a low level of detail. In this pa

- Title: Repaint123: Fast and High-quality One Image to 3D Generation with Progressive Controllable 2D Repainting
  Authors: Junwu Zhang, Zhenyu Tang, Yatian Pang, Xinhua Cheng, Peng Jin, Yida Wei, Munan Ning, Li Yuan
  Year: 2023
  ArXiv: 2312.13271
  Project: https://pku-yuangroup.github.io/repaint123/
  Key: Recent one image to 3D generation methods commonly adopt Score Distillation Sampling (SDS). Despite the impressive results, there are multiple deficiencies including multi-view inconsistency, over-sat

- Title: Text2Immersion: Generative Immersive Scene with 3D Gaussian
  Authors: Hao Ouyang, Kathryn Heal, Stephen Lombardi, Tiancheng Sun
  Year: 2023
  ArXiv: 2312.09242
  Project: https://ken-ouyang.github.io/text2immersion/index.html
  Tags: World Generation
  Key: We introduce Text2Immersion, an elegant method for producing high-quality 3D immersive scenes from text prompts. Our proposed pipeline initiates by progressively generating a Gaussian cloud using pre-

- Title: Learn to Optimize Denoising Scores for 3D Generation - A Unified and Improved Diffusion Prior on NeRF and 3D Gaussian Splatting
  Authors: Xiaofeng Yang, Yiwen Chen, Cheng Chen, Chi Zhang, Yi Xu, Xulei Yang, Fayao Liu and Guosheng Lin
  Year: 2023
  ArXiv: 2312.04820
  Code: https://github.com/yangxiaofeng/LODS
  Project: https://yangxiaofeng.github.io/demo_diffusion_prior/
  Key: We propose a unified framework aimed at enhancing the diffusion priors for 3D generation tasks. Despite the critical importance of these tasks, existing methodologies often struggle to generate high-c

- Title: CG3D: Compositional Generation for Text-to-3D
  Authors: Alexander Vilesov, Pradyumna Chari, Achuta Kadambi
  Year: 2023
  ArXiv: 2311.17907
  Project: https://asvilesov.github.io/CG3D/
  Key: With the onset of diffusion-based generative models and their ability to generate text-conditioned images, content generation has received a massive invigoration. Recently, these models have been show

- Title: HumanGaussian: Text-Driven 3D Human Generation with Gaussian Splatting
  Authors: Xian Liu, Xiaohang Zhan, Jiaxiang Tang, Ying Shan, Gang Zeng, Dahua Lin, Xihui Liu, Ziwei Liu
  Year: 2023
  ArXiv: 2311.17061
  Code: https://github.com/alvinliu0/HumanGaussian
  Project: https://alvinliu0.github.io/projects/HumanGaussian
  Tags: Avatar
  Key: Realistic 3D human generation from text prompts is a desirable yet challenging task. Existing methods optimize 3D representations like mesh or neural fields via score distillation sampling (SDS), whic

- Title: LucidDreamer: Domain-free Generation of 3D Gaussian Splatting Scenes
  Authors: Jaeyoung Chung, Suyoung Lee, Hyeongjin Nam, Jaerin Lee, Kyoung Mu Lee
  Year: 2023
  ArXiv: 2311.13384
  Code: https://github.com/luciddreamer-cvlab/LucidDreamer?tab=readme-ov-file
  Project: https://luciddreamer-cvlab.github.io/
  Tags: World Generation
  Key: With the widespread usage of VR devices and contents, demands for 3D scene generation techniques become more popular. Existing 3D scene generation models, however, limit the target scene to specific d

- Title: LucidDreamer: Towards High-Fidelity Text-to-3D Generation via Interval Score Matching
  Authors: Yixun Liang, Xin Yang, Jiantao Lin, Haodong Li, Xiaogang Xu, Yingcong Chen
  Year: 2023
  ArXiv: 2311.11284
  Code: https://github.com/EnVision-Research/LucidDreamer
  Key: The recent advancements in text-to-3D generation mark a significant milestone in generative models, unlocking new possibilities for creating imaginative 3D assets across various real-world scenarios.

- Title: GaussianDiffusion: 3D Gaussian Splatting for Denoising Diffusion Probabilistic Models with Structured Noise
  Authors: Xinhai Li, Huaibin Wang, Kuo-Kun Tseng
  Year: 2023
  ArXiv: 2311.11221
  Key: Text-to-3D, known for its efficient generation methods and expansive creative potential, has garnered significant attention in the AIGC domain. However, the amalgamation of Nerf and 2D diffusion model

- Title: GaussianDreamer: Fast Generation from Text to 3D Gaussian Splatting with Point Cloud Priors
  Authors: Taoran Yi1, Jiemin Fang, Guanjun Wu1, Lingxi Xie, Xiaopeng Zhang,
  Year: 2023
  ArXiv: 2310.08529
  Code: https://github.com/hustvl/GaussianDreamer
  Project: https://taoranyi.com/gaussiandreamer/
  Key: In recent times, the generation of 3D assets from text prompts has shown impressive results. Both 2D and 3D diffusion models can generate decent 3D objects based on prompts. 3D diffusion models have g

- Title: DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation
  Authors: Jiaxiang Tang, Jiawei Ren, Hang Zhou, Ziwei Liu, Gang Zeng
  Year: 2023
  ArXiv: 2309.16653
  Code: https://github.com/dreamgaussian/dreamgaussian
  Project: https://dreamgaussian.github.io/
  Key: Recent advances in 3D content creation mostly leverage optimization-based 3D generation via score distillation sampling (SDS). Though promising results have been exhibited, these methods often suffer

- Title: Text-to-3D using Gaussian Splatting
  Authors: Zilong Chen, Feng Wang, Huaping Liu
  Year: 2023
  ArXiv: 2309.16585
  Code: https://github.com/gsgen3d/gsgen
  Project: https://gsgen3d.github.io/
  Key: In this paper, we present Gaussian Splatting based text-to-3D generation (GSGEN), a novel approach for generating high-quality 3D objects. Previous methods suffer from inaccurate geometry and limited

- Title: Align Your Gaussians: Text-to-4D with Dynamic 3D Gaussians and Composed Diffusion Models
  Authors: Andreas Blattmann, Robin Rombach, Huan Ling, Tim Dockhorn, Seung Wook Kim, Sanja Fidler, Karsten Kreis
  Year: 2023
  ArXiv: 2304.08818
  Project: https://research.nvidia.com/labs/toronto-ai/AlignYourGaussians/
  Key: Recent advancements in 3D reconstruction from single images have been driven by the evolution of generative models. Prominent among these are methods based on Score Distillation Sampling (SDS) and the

- Title: Instruct-4DGS: Efficient Dynamic Scene Editing via 4D Gaussian-based Static-Dynamic Separation
  Authors: Joohyun Kwon, Hanbyel Cho, Junmo Kim
  Year: 2025
  ArXiv: 2502.02091
  Project: https://hanbyelcho.info/instruct-4dgs/
  Tags: Dynamic, Rendering, Editing
  Key: Recent 4D dynamic scene editing methods require editing thousands of 2D images used for dynamic scene synthesis and updating the entire scene with additional training loops, resulting in several hours

================================================================================
CATEGORY: Distributed (3 papers)
================================================================================

- Title: CoSurfGS:Collaborative 3D Surface Gaussian Splatting with Distributed Learning for Large Scene Reconstruction
  Authors: Yuanyuan Gao, Yalun Dai, Hao Li, Weicai Ye, Junyi Chen, Danpeng Chen, Dingwen Zhang, Tong He, Guofeng Zhang, Junwei Han
  Year: 2024
  ArXiv: 2412.17612
  Project: https://gyy456.github.io/CoSurfGS/
  Tags: Large-Scale, Meshing
  Key: 3D Gaussian Splatting (3DGS) has demonstrated impressive performance in scene reconstruction. However, most existing GS-based surface reconstruction methods focus on 3D objects or limited scenes. Dire

- Title: On Scaling Up 3D Gaussian Splatting Training
  Authors: Hexu Zhao, Haoyang Weng, Daohan Lu, Ang Li, Jinyang Li, Aurojit Panda, Saining Xie
  Year: 2024
  ArXiv: 2406.18533
  Code: https://github.com/nyu-systems/Grendel-GS
  Project: https://daohanlu.github.io/scaling-up-3dgs/
  Tags: Large-Scale
  Key: 3D Gaussian Splatting (3DGS) is increasingly popular for 3D reconstruction due to its superior visual quality and rendering speed. However, 3DGS training currently occurs on a single GPU, limiting its

- Title: Fed3DGS: Scalable 3D Gaussian Splatting with Federated Learning
  Authors: Teppei Suzuki
  Year: 2024
  ArXiv: 2403.11460
  Code: https://github.com/DensoITLab/Fed3DGS
  Tags: Large-Scale
  Key: In this work, we present Fed3DGS, a scalable 3D reconstruction framework based on 3D Gaussian splatting (3DGS) with federated learning. Existing city-scale reconstruction methods typically adopt a cen

================================================================================
CATEGORY: Dynamic (72 papers)
================================================================================

- Title: FastGS: Training 3D Gaussian Splatting in 100 Seconds
  Authors: Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu
  Year: 2025
  ArXiv: 2511.04283
  Code: https://github.com/fastgs/FastGS
  Project: https://fastgs.github.io/
  Tags: Acceleration, Densification, Sparse
  Key: The dominant 3D Gaussian splatting (3DGS) acceleration methods fail to properly regulate the number of Gaussians during training, causing redundant computational time overhead. In this paper, we propo

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Diffusion, Feed-Forward, Gaussian Video, Virtual Reality, World Generation
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: Motion Blender Gaussian Splatting for Dynamic Scene Reconstruction
  Authors: Xinyu Zhang, Haonan Chang, Yuhan Liu, Abdeslam Boularias
  Year: 2025
  ArXiv: 2503.09040
  Code: https://github.com/mlzxy/motion-blender-gs
  Project: https://mlzxy.github.io/motion-blender-gs/
  Tags: Editing, Robotics, Segmentation
  Key: Gaussian splatting has emerged as a powerful tool for high-fidelity reconstruction of dynamic scenes. However, existing methods primarily rely on implicit motion representations, such as encoding moti

- Title: OmniPhysGS: 3D Constitutive Gaussians for General Physics-Based Dynamics Generation
  Authors: Yuchen Lin, Chenguo Lin, Jianjin Xu, Yadong Mu
  Year: 2025
  ArXiv: 2501.18982
  Code: https://github.com/wgsxm/omniphysgs
  Project: https://wgsxm.github.io/projects/omniphysgs/
  Tags: Physics
  Key: Recently, significant advancements have been made in the reconstruction and generation of 3D assets, including static cases and those with physical interactions. To recover the physical properties of

- Title: GSTAR: Gaussian Surface Tracking and Reconstruction
  Authors: Chengwei Zheng, Lixin Xue, Juan Zarate, Jie Song
  Year: 2025
  ArXiv: 2501.10283
  Project: chengwei-zheng.github.io/GSTAR/
  Tags: Avatar, Meshing
  Key: 3D Gaussian Splatting techniques have enabled efficient photo-realistic rendering of static scenes. Recent works have extended these approaches to support surface reconstruction and tracking. However,

- Title: Evaluating Human Perception of Novel View Synthesis: Subjective Quality Assessment of Gaussian Splatting and NeRF in Dynamic Scenes
  Authors: Yuhang Zhang, Joshua Maraval, Zhengyu Zhang, Nicolas Ramin, Shishun Tian, Lu Zhang
  Year: 2025
  ArXiv: 2501.08072
  Key: Gaussian Splatting (GS) and Neural Radiance Fields (NeRF) are two groundbreaking technologies that have revolutionized the field of Novel View Synthesis (NVS), enabling immersive photorealistic render

- Title: RMAvatar: Photorealistic Human Avatar Reconstruction from Monocular Video Based on Rectified Mesh-embedded Gaussians
  Authors: Sen Peng, Weixing Xie, Zilong Wang, Xiaohu Guo, Zhonggui Chen, Baorong Yang, Xiao Dong
  Year: 2025
  ArXiv: 2501.07104
  Code: https://github.com/RMAvatar/RMAvatar
  Project: https://rm-avatar.github.io/
  Tags: Avatar, Meshing, Monocular
  Key: We introduce RMAvatar, a novel human avatar representation with Gaussian splatting embedded on mesh to learn clothed avatar from a monocular video. We utilize the explicit mesh geometry to represent m

- Title: Synthetic Prior for Few-Shot Drivable Head Avatar Inversion
  Authors: Wojciech Zielonka, Stephan J. Garbin, Alexandros Lattas, George Kopanas, Paulo Gotardo, Thabo Beeler, Justus Thies, Timo Bolkart
  Year: 2025
  ArXiv: 2501.06903
  Project: https://zielon.github.io/synshot/
  Tags: Avatar, Sparse
  Key: We present SynShot, a novel method for the few-shot inversion of a drivable head avatar based on a synthetic prior. We tackle two major challenges. First, training a controllable 3D generative network

- Title: MoDec-GS: Global-to-Local Motion Decomposition and Temporal Interval Adjustment for Compact Dynamic 3D Gaussian Splatting
  Authors: Sangwoon Kwak, Joonsoo Kim, Jun Young Jeong, Won-Sik Cheong, Jihyong Oh, Munchurl Kim
  Year: 2025
  ArXiv: 2501.03714
  Project: MoDec-GS: Global-to-Local Motion Decomposition and Temporal Interval Adjustment for Compact Dynamic 3D Gaussian Splatting
  Tags: Compression
  Key: 3D Gaussian Splatting (3DGS) has made significant strides in scene representation and neural rendering, with intense efforts focused on adapting it for dynamic scenes. Despite delivering remarkable re

- Title: EnerVerse: Envisioning Embodied Future Space for Robotics Manipulation
  Authors: Siyuan Huang, Liliang Chen, Pengfei Zhou, Shengcong Chen, Zhengkai Jiang, Yue Hu, Peng Gao, Hongsheng Li, Maoqing Yao, Guanghui Ren
  Year: 2025
  ArXiv: 2501.01895
  Project: https://sites.google.com/view/enerverse
  Tags: Robotics
  Key: We introduce EnerVerse, a comprehensive framework for embodied future space generation specifically designed for robotic manipulation tasks. EnerVerse seamlessly integrates convolutional and bidirecti

- Title: STORM: Spatio-Temporal Reconstruction Model for Large-Scale Outdoor Scenes
  Authors: Jiawei Yang, Jiahui Huang, Yuxiao Chen, Yan Wang, Boyi Li, Yurong You, Apoorva Sharma, Maximilian Igl, Peter Karkus, Danfei Xu, Boris Ivanovic, Yue Wang, Marco Pavone
  Year: 2024
  ArXiv: 2501.00602
  Tags: Autonomous Driving, Large-Scale
  Key: We present STORM, a spatio-temporal reconstruction model designed for reconstructing dynamic outdoor scenes from sparse observations. Existing dynamic reconstruction methods often rely on per-scene op

- Title: DreamDrive: Generative 4D Scene Modeling from Street View Images
  Authors: Jiageng Mao, Boyi Li, Boris Ivanovic, Yuxiao Chen, Yan Wang, Yurong You, Chaowei Xiao, Danfei Xu, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2501.00601
  Tags: Autonomous Driving, Feed-Forward
  Key: Synthesizing photo-realistic visual observations from an ego vehicle's driving trajectory is a critical step towards scalable training of self-driving models. Reconstruction-based methods create 3D sc

- Title: 4D Gaussian Splatting: Modeling Dynamic Scenes with Native 4D Primitives
  Authors: Zeyu Yang, Zijie Pan, Xiatian Zhu, Li Zhang, Yu-Gang Jiang, Philip H. S. Torr
  Year: 2024
  ArXiv: 2412.20720
  Tags: Compression, Large-Scale
  Key: Dynamic 3D scene representation and novel view synthesis from captured videos are crucial for enabling immersive experiences required by AR/VR and metaverse applications. However, this task is challen

- Title: GauSim: Registering Elastic Objects into Digital World by Gaussian Simulator
  Authors: Yidi Shao, Mu Huang, Chen Change Loy, Bo Dai
  Year: 2024
  ArXiv: 2412.17804
  Project: https://www.mmlab-ntu.com/project/gausim/index.html
  Tags: Physics
  Key: In this work, we introduce GauSim, a novel neural network-based simulator designed to capture the dynamic behaviors of real-world elastic objects represented through Gaussian kernels. Unlike tradition

- Title: SqueezeMe: Efficient Gaussian Avatars for VR
  Authors: Shunsuke Saito, Stanislav Pidhorskyi, Igor Santesteban, Forrest Iandola, Divam Gupta, Anuj Pahuja, Nemanja Bartolovic, Frank Yu, Emanuel Garbin, Tomas Simon
  Year: 2024
  ArXiv: 2412.15171
  Project: https://forresti.github.io/squeezeme
  Tags: Avatar
  Key: Gaussian Splatting has enabled real-time 3D human avatars with unprecedented levels of visual quality. While previous methods require a desktop GPU for real-time inference of a single avatar, we aim t

- Title: SplineGS: Robust Motion-Adaptive Spline for Real-Time Dynamic 3D Gaussians from Monocular Video
  Authors: Jongmin Park, Minh-Quan Viet Bui, Juan Luis Gonzalez Bello, Jaeho Moon, Jihyong Oh, Munchurl Kim
  Year: 2024
  ArXiv: 2412.09982
  Code: https://github.com/KAIST-VICLab/SplineGS
  Project: https://kaist-viclab.github.io/splinegs-site/
  Tags: Monocular
  Key: Synthesizing novel views from in-the-wild monocular videos is challenging due to scene dynamics and the lack of multi-view cues. To address this, we propose SplineGS, a COLMAP-free dynamic 3D Gaussian

- Title: Representing Long Volumetric Video with Temporal Gaussian Hierarchy
  Authors: Zhen Xu, Yinghao Xu, Zhiyuan Yu, Sida Peng, Jiaming Sun, Hujun Bao, Xiaowei Zhou
  Year: 2024
  ArXiv: 2412.09608
  Project: https://zju3dv.github.io/longvolcap/
  Tags: Acceleration
  Key: This paper aims to address the challenge of reconstructing long volumetric videos from multi-view RGB videos. Recent dynamic view synthesis methods leverage powerful 4D representations, like feature g

- Title: 4D Gaussian Splatting with Scale-aware Residual Field and Adaptive Optimization for Real-time Rendering of Temporally Complex Dynamic Scenes
  Authors: Jinbo Yan, Rui Peng, Luyang Tang, Ronggang Wang
  Year: 2024
  ArXiv: 2412.06299
  Code: https://github.com/yjb6/SaRO-GS
  Project: https://yjb6.github.io/SaRO-GS.github.io/
  Tags: Densification, Optimization
  Key: Reconstructing dynamic scenes from video sequences is a highly promising task in the multimedia domain. While previous methods have made progress, they often struggle with slow rendering and managing

- Title: Temporally Compressed 3D Gaussian Splatting for Dynamic Scenes
  Authors: Saqib Javed, Ahmad Jarrar Khan, Corentin Dumery, Chen Zhao, Mathieu Salzmann
  Year: 2024
  ArXiv: 2412.05700
  Project: https://ahmad-jarrar.github.io/tc-3dgs/
  Tags: Acceleration, Compression
  Key: Recent advancements in high-fidelity dynamic scene reconstruction have leveraged dynamic 3D Gaussians and 4D Gaussian Splatting for realistic scene representation. However, to make these methods viabl

- Title: Feed-Forward Bullet-Time Reconstruction of Dynamic Scenes from Monocular Videos
  Authors: Hanxue Liang, Jiawei Ren, Ashkan Mirzaei, Antonio Torralba, Ziwei Liu, Igor Gilitschenski, Sanja Fidler, Cengiz Oztireli, Huan Ling, Zan Gojcic, Jiahui Huang
  Year: 2024
  ArXiv: 2412.03526
  Tags: Feed-Forward, Monocular
  Key: Recent advancements in static feed-forward scene reconstruction have demonstrated significant progress in high-quality novel view synthesis. However, these models often struggle with generalizability

- Title: DynSUP: Dynamic Gaussian Splatting from An Unposed Image Pair
  Authors: Weihang Li, Weirong Chen, Shenhan Qian, Jiajie Chen, Daniel Cremers, Haoang Li
  Year: 2024
  ArXiv: 2412.00851
  Project: https://colin-de.github.io/DynSUP/
  Tags: Poses
  Key: Recent advances in 3D Gaussian Splatting have shown promising results. Existing methods typically assume static scenes and/or multiple images with prior poses. Dynamics, sparse views, and unknown pose

- Title: SADG: Segment Any Dynamic Gaussians Without Object Trackers
  Authors: Yun-Jin Li, Mariia Gladkova, Yan Xia, Daniel Cremers
  Year: 2024
  ArXiv: 2411.19290
  Project: https://yunjinli.github.io/project-sadg/
  Tags: Segmentation
  Key: Understanding dynamic 3D scenes is fundamental for various applications, including extended reality (XR) and autonomous driving. Effectively integrating semantic information into 3D reconstruction ena

- Title: Gaussians-to-Life: Text-Driven Animation of 3D Gaussian Splatting Scenes
  Authors: Thomas Wimmer, Michael Oechsle, Michael Niemeyer, Federico Tombari
  Year: 2024
  ArXiv: 2411.19233
  Code: https://github.com/wimmerth/gaussians2life
  Project: https://wimmerth.github.io/gaussians2life.html
  Tags: Diffusion
  Key: State-of-the-art novel view synthesis methods achieve impressive results for multi-view captures of static 3D scenes. However, the reconstructed scenes still lack "liveliness," a key component for cre

- Title: CAT4D: Create Anything in 4D with Multi-View Video Diffusion Models
  Authors: Rundi Wu, Ruiqi Gao, Ben Poole, Alex Trevithick, Changxi Zheng, Jonathan T. Barron, Aleksander Holynski
  Year: 2024
  ArXiv: 2411.18613
  Project: https://cat-4d.github.io/
  Tags: Diffusion
  Key: We present CAT4D, a method for creating 4D (dynamic 3D) scenes from monocular video. CAT4D leverages a multi-view video diffusion model trained on a diverse combination of datasets to enable novel vie

- Title: FATE: Full-head Gaussian Avatar with Textural Editing from Monocular Video
  Authors: Jiawei Zhang, Zijian Wu, Zhiyang Liang, Yicheng Gong, Dongfang Hu, Yao Yao, Xun Cao, Hao Zhu
  Year: 2024
  ArXiv: 2411.15604
  Code: https://github.com/zjwfufu/FateAvatar
  Project: https://zjwfufu.github.io/FATE-page/
  Tags: Avatar, Editing, Monocular, Texturing
  Key: Reconstructing high-fidelity, animatable 3D head avatars from effortlessly captured monocular videos is a pivotal yet formidable challenge. Although significant progress has been made in rendering per

- Title: GPS-Gaussian+: Generalizable Pixel-wise 3D Gaussian Splatting for Real-Time Human-Scene Rendering from Sparse Views
  Authors: Boyao Zhou, Shunyuan Zheng, Hanzhang Tu, Ruizhi Shao, Boning Liu, Shengping Zhang, Liqiang Nie, Yebin Liu
  Year: 2024
  ArXiv: 2411.11363
  Project: https://yaourtb.github.io/GPS-Gaussian+
  Tags: Acceleration, Rendering
  Key: Differentiable rendering techniques have recently shown promising results for free-viewpoint video synthesis of characters. However, such methods, either Gaussian Splatting or neural implicit renderin

- Title: Fully Explicit Dynamic Gaussian Splatting
  Authors: Junoh Lee, Changyeon Won, HyunJun Jung, Inhwan Bae, Hae-Gon Jeon
  Year: 2024
  ArXiv: 2410.15629
  Code: https://github.com/juno181/Ex4DGS
  Project: https://leejunoh.com/Ex4DGS/
  Key: 3D Gaussian Splatting has shown fast and high-quality rendering results in static scenes by leveraging dense 3D prior and explicit representations. Unfortunately, the benefits of the prior and represe

- Title: MotionGS: Exploring Explicit Motion Guidance for Deformable 3D Gaussian Splatting
  Authors: Ruijie Zhu*, Yanzhe Liang*, Hanzhi Chang, Jiacheng Deng, Jiahao Lu, Wenfei Yang, Tianzhu Zhang, Yongdong Zhang
  Year: 2024
  ArXiv: 2410.07707
  Project: https://ruijiezhu94.github.io/MotionGS_page
  Key: Dynamic scene reconstruction is a long-term challenge in the field of 3D vision. Recently, the emergence of 3D Gaussian Splatting has provided new insights into this problem. Although subsequent effor

- Title: MonST3R: A Simple Approach for Estimating Geometry in the Presence of Motion
  Authors: Junyi Zhang, Charles Herrmann, Junhwa Hur, Varun Jampani, Trevor Darrell, Forrester Cole, Deqing Sun, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2410.03825
  Code: https://github.com/Junyi42/monst3r
  Project: https://monst3r-project.github.io/
  Tags: 3ster-based, Sparse
  Key: Estimating geometry from dynamic scenes, where objects move and deform over time, remains a core challenge in computer vision. Current approaches often rely on multi-stage pipelines or global optimiza

- Title: DynOMo: Online Point Tracking by Dynamic Online Monocular Gaussian Reconstruction
  Authors: Jenny Seidenschwarz, Qunjie Zhou, Bardienus Duisterhof, Deva Ramanan, Laura Leal-Taixé
  Year: 2024
  ArXiv: 2409.02104
  Tags: Monocular
  Key: Reconstructing scenes and tracking motion are two sides of the same coin. Tracking points allow for geometric reconstruction [14], while geometric reconstruction of (dynamic) scenes allows for 3D trac

- Title: HeadGAP: Few-shot 3D Head Avatar via Generalizable Gaussian Priors
  Authors: Xiaozheng Zheng, Chao Wen, Zhaohu Li, Weiyi Zhang, Zhuo Su, Xu Chang, Yang Zhao, Zheng Lv, Xiaoyuan Zhang, Yongjie Zhang, Guidong Wang, Lan Xu
  Year: 2024
  ArXiv: 2408.06019
  Project: https://headgap.github.io/
  Tags: Avatar
  Key: In this paper, we present a novel 3D head avatar creation approach capable of generalizing from few-shot in-the-wild data with high-fidelity and animatable robustness. Given the underconstrained natur

- Title: Optimizing Dynamic NeRF and 3DGS with No Video Synchronization
  Authors: Seoha Kim*, Jeongmin Bae*, Youngsik Yun, HyunSeung Son, Hahyun Lee, Gun Bang, Youngjung Uh
  Year: 2024
  Paper: https://openreview.net/pdf?id=RQutkn4V9I
  Key: Recent advancements in 4D scene reconstruction using dynamic NeRF and 3DGS have demonstrated the ability to represent dynamic scenes from multi-view videos. However, they fail to reconstruct the dynam

- Title: EgoGaussian: Dynamic Scene Understanding from Egocentric Video with 3D Gaussian Splatting
  Authors: Daiwei Zhang, Gengyan Li, Jiajie Li, Mickaël Bressieux, Otmar Hilliges, Marc Pollefeys, Luc Van Gool, Xi Wang
  Year: 2024
  ArXiv: 2406.19811
  Code: https://github.com/zdwww/EgoGaussian
  Project: https://zdwww.github.io/egogs.github.io/
  Key: Human activities are inherently complex, often involving numerous object interactions. To better understand these activities, it is crucial to model their interactions with the environment captured th

- Title: Dynamic Gaussian Marbles for Novel View Synthesis of Casual Monocular Videos
  Authors: Colton Stearns, Adam Harley, Mikaela Uy, Florian Dubost, Federico Tombari, Gordon Wetzstein, Leonidas Guibas
  Year: 2024
  ArXiv: 2406.18717
  Code: https://github.com/coltonstearns/dynamic-gaussian-marbles
  Project: https://geometry.stanford.edu/projects/dynamic-gaussian-marbles.github.io/
  Tags: Monocular
  Key: Gaussian splatting has become a popular representation for novel-view synthesis, exhibiting clear strengths in efficiency, photometric quality, and compositional edibility. Following its success, many

- Title: MoDGS: Dynamic Gaussian Splatting from Causually-captured Monocular Videos
  Authors: Qingming Liu*, Yuan Liu*, Jiepeng Wang, Xianqiang Lv,Peng Wang, Wenping Wang, Junhui Hou†,
  Year: 2024
  ArXiv: 2406.00434
  Project: https://modgs.github.io/
  Tags: Monocular
  Key: In this paper, we propose MoDGS, a new pipeline to render novel-view images in dynamic scenes using only casually captured monocular videos. Previous monocular dynamic NeRF or Gaussian Splatting metho

- Title: DGD: Dynamic 3D Gaussians Distillation
  Authors: Isaac Labe*, Noam Issachar*, Itai Lang, Sagie Benaim
  Year: 2024
  ArXiv: 2405.19321
  Code: https://github.com/Isaaclabe/DGD-Dynamic-3D-Gaussians-Distillation
  Project: https://isaaclabe.github.io/DGD-Website/
  Key: We tackle the task of learning dynamic 3D semantic radiance fields given a single monocular video as input. Our learned semantic radiance field captures per-point semantics as well as color and geomet

- Title: Vidu4D: Single Generated Video to High-Fidelity 4D Reconstruction with Dynamic Gaussian Surfels
  Authors: Yikai Wang, Xinzhou Wang, Zilong Chen, Zhengyi Wang, Fuchun Sun, Jun Zhu
  Year: 2024
  ArXiv: 2405.16822
  Code: https://github.com/yikaiw/vidu4d
  Project: https://vidu4d-dgs.github.io/
  Tags: 2DGS
  Key: Video generative models are receiving particular attention given their ability to generate realistic and imaginative frames. Besides, these models are also observed to exhibit strong 3D consistency, s

- Title: GarmentDreamer: 3DGS Guided Garment Synthesis with Diverse Geometry and Texture Details
  Authors: Boqian Li, Xuan Li, Ying Jiang, Tianyi Xie, Feng Gao, Huamin Wang, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2405.12420
  Code: https://github.com/boqian-li/GarmentDreamer
  Project: https://xuan-li.github.io/GarmentDreamerDemo/
  Tags: Avatar, Rendering, Texturing
  Key: Traditional 3D garment creation is labor-intensive, involving sketching, modeling, UV mapping, and texturing, which are time-consuming and costly. Recent advances in diffusion-based generative models

- Title: Gaussian Head & Shoulders: High Fidelity Neural Upper Body Avatars with Anchor Gaussian Guided Texture Warping
  Authors: Tianhao Wu, Jing Yang, Zhilin Guo, Jingyi Wan, Fangcheng Zhong, Cengiz Oztireli
  Year: 2024
  ArXiv: 2405.12069
  Project: https://gaussian-head-shoulders.netlify.app/
  Tags: Avatar
  Key: By equipping the most recent 3D Gaussian Splatting representation with head 3D morphable models (3DMM), existing methods manage to create head avatars with high fidelity. However, most existing method

- Title: DreamScene4D: Dynamic Multi-Object Scene Generation from Monocular Videos
  Authors: Wen-Hsuan Chu, Lei Ke, Katerina Fragkiadaki
  Year: 2024
  ArXiv: 2405.02280
  Code: https://github.com/dreamscene4d/dreamscene4d
  Project: https://dreamscene4d.github.io/
  Tags: Monocular
  Key: Existing VLMs can track in-the-wild 2D video objects while current generative models provide powerful visual priors for synthesizing novel views for the highly under-constrained 2D-to-3D object liftin

- Title: PhyRecon: Physically Plausible Neural Scene Reconstruction
  Authors: Junfeng Ni, Yixin Chen, Bohan Jing, Nan Jiang, Bin Wang, Bo Dai, Puhao Li, Yixin Zhu, Song-Chun Zhu, Siyuan Huang
  Year: 2024
  ArXiv: 2404.16666
  Code: https://github.com/PhyRecon/PhyRecon
  Project: https://phyrecon.github.io/
  Tags: Meshing, Physics
  Key: We address the issue of physical implausibility in multi-view neural reconstruction. While implicit representations have gained popularity in multi-view 3D reconstruction, previous work struggles to y

- Title: 3D Geometry-aware Deformable Gaussian Splatting for Dynamic View Synthesis
  Authors: Zhicheng Lu, Xiang Guo, Le Hui, Tianrui Chen, Min Yang, Xiao Tang, Feng Zhu, Yuchao Dai
  Year: 2024
  ArXiv: 2404.06270
  Code: https://github.com/zhichengLuxx/GaGS
  Project: https://npucvr.github.io/GaGS/
  Key: In this paper, we propose a 3D geometry-aware deformable Gaussian Splatting method for dynamic view synthesis. Existing neural radiance fields (NeRF) based solutions learn the deformation in an implic

- Title: Per-Gaussian Embedding-Based Deformation for Deformable 3D Gaussian Splatting
  Authors: Jeongmin Bae*, Seoha Kim*, Youngsik Yun, Hahyun Lee, Gun Bang, Youngjung Uh
  Year: 2024
  ArXiv: 2404.03613
  Code: https://github.com/JeongminB/E-D3DGS
  Project: https://jeongminb.github.io/e-d3dgs/
  Key: As 3D Gaussian Splatting (3DGS) provides fast and high-quality novel view synthesis, it is a natural extension to deform a canonical 3DGS to multiple frames for representing a dynamic scene. However,

- Title: Gaussian Frosting: Editable Complex Radiance Fields with Real-Time Rendering
  Authors: Antoine Guédon, Vincent Lepetit
  Year: 2024
  ArXiv: 2403.14554
  Code: https://github.com/Anttwo/Frosting
  Project: https://anttwo.github.io/frosting/
  Tags: Editing, Meshing
  Key: We propose Gaussian Frosting, a novel mesh-based representation for high-quality rendering and editing of complex 3D effects in real-time. Our approach builds on the recent 3D Gaussian Splatting frame

- Title: GaussianFlow: Splatting Gaussian Dynamics for 4D Content Creation
  Authors: Quankai Gao, Qiangeng Xu, Zhe Cao, Ben Mildenhall, Wenchao Ma, Le Chen, Danhang Tang, Ulrich Neumann
  Year: 2024
  ArXiv: 2403.12365
  Project: https://zerg-overmind.github.io/GaussianFlow.github.io/
  Key: Creating 4D fields of Gaussian Splatting from images or videos is a challenging task due to its under-constrained nature. While the optimization can draw photometric reference from the input videos or

- Title: Bridging 3D Gaussian and Mesh for Freeview Video Rendering
  Authors: Yuting Xiao, Xuan Wang, Jiafei Li, Hongrui Cai, Yanbo Fan, Nan Xue, Minghui Yang, Yujun Shen, Shenghua Gao
  Year: 2024
  ArXiv: 2403.11453
  Tags: Avatar, Meshing
  Key: This is only a preview version of GauMesh. Recently, primitive-based rendering has been proven to achieve convincing results in solving the problem of modeling and rendering the 3D dynamic scene from

- Title: None
  Authors: Zhiyang Guo, Wengang Zhou, Li Li, Min Wang, Houqiang Li
  Year: 2024
  ArXiv: 2403.11447
  Key: 3D Gaussian Splatting (3DGS) has become an emerging tool for dynamic scene reconstruction. However, existing methods focus mainly on extending static 3DGS into a time-variant representation, while ove

- Title: BAGS: Building Animatable Gaussian Splatting from a Monocular Video with Diffusion Priors
  Authors: Tingyang Zhang, Qingzhe Gao, Weiyu Li, Libin Liu, Baoquan Chen
  Year: 2024
  ArXiv: 2403.11427
  Code: https://github.com/Michaelszj/bags
  Tags: Diffusion, Monocular
  Key: Animatable 3D reconstruction has significant applications across various fields, primarily relying on artists' handcraft creation. Recently, some studies have successfully constructed animatable 3D mo

- Title: Reconstruction and Simulation of Elastic Objects with Spring-Mass 3D Gaussians
  Authors: Licheng Zhong, Hong-Xing Yu, Jiajun Wu, Yunzhu Li
  Year: 2024
  ArXiv: 2403.09434
  Code: https://github.com/Colmar-zlicheng/Spring-Gaus
  Project: https://zlicheng.com/spring_gaus/
  Tags: Physics
  Key: Reconstructing and simulating elastic objects from visual observations is crucial for applications in computer vision and robotics. Existing methods, such as 3D Gaussians, provide modeling for 3D appe

- Title: ManiGaussian: Dynamic Gaussian Splatting for Multi-task Robotic Manipulation
  Authors: Guanxing Lu, Shiyi Zhang, Ziwei Wang, Changliu Liu, Jiwen Lu, Yansong Tang
  Year: 2024
  ArXiv: 2403.08321
  Code: https://github.com/GuanxingLu/ManiGaussian
  Project: https://guanxinglu.github.io/ManiGaussian/
  Tags: Robotics
  Key: Performing language-conditioned robotic manipulation tasks in unstructured environments is highly demanded for general intelligent robots. Conventional robotic manipulation methods usually learn seman

- Title: 3DGStream: On-the-Fly Training of 3D Gaussians for Efficient Streaming of Photo-Realistic Free-Viewpoint Videos
  Authors: Jiakai Sun, Han Jiao, Guangyuan Li, Zhanjie Zhang, Lei Zhao, Wei Xing
  Year: 2023
  ArXiv: 2403.01444
  Code: https://github.com/SJoJoK/3DGStream
  Project: https://sjojok.github.io/3dgstream/
  Key: Constructing photo-realistic Free-Viewpoint Videos (FVVs) of dynamic scenes from multi-view videos remains a challenging endeavor. Despite the remarkable advancements achieved by current neural render

- Title: Mesh-based Gaussian Splatting for Real-time Large-scale Deformation
  Authors: Lin Gao, Jie Yang, Bo-Tao Zhang, Jia-Mu Sun, Yu-Jie Yuan, Hongbo Fu, Yu-Kun Lai
  Year: 2024
  ArXiv: 2402.04796
  Tags: Meshing
  Key: Neural implicit representations, including Neural Distance Fields and Neural Radiance Fields, have demonstrated significant capabilities for reconstructing surfaces with complicated geometry and topol

- Title: 4D Gaussian Splatting: Towards Efficient Novel View Synthesis for Dynamic Scenes
  Authors: Yuanxing Duan, Fangyin Wei, Qiyu Dai, Yuhang He, Wenzheng Chen, Baoquan Chen
  Year: 2024
  ArXiv: 2402.03307
  Code: https://github.com/weify627/4D-Rotor-Gaussians
  Project: https://weify627.github.io/4drotorgs/
  Key: We consider the problem of novel view synthesis (NVS) for dynamic scenes. Recent neural approaches have accomplished exceptional NVS results for static 3D scenes, but extensions to 4D time-varying sce

- Title: GaMeS: Mesh-Based Adapting and Modification of Gaussian Splatting
  Authors: Joanna Waczyńska, Piotr Borycki, Sławomir Tadeja, Jacek Tabor, Przemysław Spurek
  Year: 2024
  ArXiv: 2402.01459
  Code: https://github.com/waczjoan/gaussian-mesh-splatting
  Tags: Meshing
  Key: In recent years, a range of neural network-based methods for image rendering have been introduced. For instance, widely-researched neural radiance fields (NeRF) rely on a neural network to represent 3

- Title: Endo-4DGS: Endoscopic Monocular Scene Reconstruction with 4D Gaussian Splatting
  Authors: Yiming Huang, Beilei Cui, Long Bai, Ziqi Guo, Mengya Xu, Mobarakol Islam, Hongliang Ren
  Year: 2024
  ArXiv: 2401.16416
  Tags: Medicine
  Key: In the realm of robot-assisted minimally invasive surgery, dynamic scene reconstruction can significantly enhance downstream tasks and improve surgical outcomes. Neural Radiance Fields (NeRF)-based me

- Title: Gaussian Splashing: Dynamic Fluid Synthesis with Gaussian Splatting
  Authors: Yutao Feng, Xiang Feng, Yintong Shang, Ying Jiang, Chang Yu, Zeshun Zong, Tianjia Shao, Hongzhi Wu, Kun Zhou, Chenfanfu Jiang, Yin Yang
  Year: 2024
  ArXiv: 2401.15318
  Project: https://amysteriouscat.github.io/GaussianSplashing/
  Tags: Physics, Rendering
  Key: We demonstrate the feasibility of integrating physics-based animations of solids and fluids with 3D Gaussian Splatting (3DGS) to create novel effects in virtual scenes reconstructed using 3DGS. Levera

- Title: Spacetime Gaussian Feature Splatting for Real-Time Dynamic View Synthesis
  Authors: Zhan Li, Zhang Chen, Zhong Li, Yi Xu
  Year: 2023
  ArXiv: 2312.16812
  Code: https://github.com/oppo-us-research/SpacetimeGaussians
  Project: https://oppo-us-research.github.io/SpacetimeGaussians-website/
  Key: Novel view synthesis of dynamic scenes has been an intriguing yet challenging problem. Despite recent advancements, simultaneously achieving high-resolution photorealistic results, real-time rendering

- Title: SWinGS: Sliding Windows for Dynamic 3D Gaussian Splatting
  Authors: Richard Shaw, Michal Nazarczuk, Jifei Song, Arthur Moreau, Sibi Catley-Chandar, Helisa Dhamo, Eduardo Perez-Pellitero
  Year: 2023
  ArXiv: 2312.13308
  Key: Novel view synthesis has shown rapid progress recently, with methods capable of producing increasingly photorealistic results. 3D Gaussian Splatting has emerged as a promising method, producing high-q

- Title: GauFRe: Gaussian Deformation Fields for Real-time Dynamic Novel View Synthesis
  Authors: Yiqing Liang, Numair Khan, Zhengqin Li, Thu Nguyen-Phuoc, Douglas Lanman, James Tompkin, Lei Xiao
  Year: 2023
  ArXiv: 2312.11458
  Project: https://lynl7130.github.io/gaufre/index.html
  Key: We propose a method for dynamic scene reconstruction using deformable 3D Gaussians that is tailored for monocular video. Building upon the efficiency of Gaussian splatting, our approach extends the re

- Title: CoGS: Controllable Gaussian Splatting
  Authors: Heng Yu, Joel Julin, Zoltán Á. Milacski, Koichiro Niinuma, László A. Jeni
  Year: 2023
  ArXiv: 2312.05664
  Project: https://cogs2023.github.io/
  Key: Capturing and re-animating the 3D structure of articulated objects present significant barriers. On one hand, methods requiring extensively calibrated multi-view setups are prohibitively complex and r

- Title: SC-GS: Sparse-Controlled Gaussian Splatting for Editable Dynamic Scenes
  Authors: Yi-Hua Huang, Yang-Tian Sun, Ziyi Yang, Xiaoyang Lyu, Yan-Pei Cao, Xiaojuan Qi
  Year: 2023
  ArXiv: 2312.14937
  Code: https://github.com/yihua7/SC-GS
  Project: https://yihua7.github.io/SC-GS-web/
  Key: Novel view synthesis for dynamic scenes is still a challenging problem in computer vision and graphics. Recently, Gaussian splatting has emerged as a robust technique to represent static scenes and en

- Title: Neural Parametric Gaussians for Monocular Non-Rigid Object Reconstruction
  Authors: Devikalyan Das, Christopher Wewer, Raza Yunus, Eddy Ilg, Jan Eric Lenssen
  Year: 2023
  ArXiv: 2312.01196
  Code: https://github.com/DevikalyanDas/npgs
  Project: https://geometric-rl.mpi-inf.mpg.de/npg/
  Tags: Monocular
  Key: Reconstructing dynamic objects from monocular videos is a severely underconstrained and challenging problem, and recent work has approached it in various directions. However, owing to the ill-posed na

- Title: DynMF: Neural Motion Factorization for Real-time Dynamic View Synthesis with 3D Gaussian Splatting
  Authors: Agelos Kratimenos, Jiahui Lei, Kostas Daniilidis
  Year: 2023
  ArXiv: 2312.00112
  Project: https://agelosk.github.io/dynmf/
  Key: Accurately and efficiently modeling dynamic scenes and motions is considered so challenging a task due to temporal dynamics and motion complexity. To address these challenges, we propose DynMF, a comp

- Title: MD-Splatting: Learning Metric Deformation from 4D Gaussians in Highly Deformable Scenes
  Authors: Bardienus P. Duisterhof, Zhao Mandi, Yunchao Yao, Jia-Wei Liu, Mike Zheng Shou, Shuran Song, Jeffrey Ichnowski
  Year: 2023
  ArXiv: 2312.00583
  Code: https://github.com/momentum-robotics-lab/md-splatting
  Project: https://md-splatting.github.io/
  Key: Accurate 3D tracking in highly deformable scenes with occlusions and shadows can facilitate new applications in robotics, augmented reality, and generative AI. However, tracking under these conditions

- Title: A Compact Dynamic 3D Gaussian Representation for Real-Time Dynamic View Synthesis
  Authors: Kai Katsumata, Duc Minh Vo, Hideki Nakayama
  Year: 2023
  ArXiv: 2311.12897
  Code: https://github.com/raven38/EfficientDynamic3DGaussian
  Project: https://compactdynamic3dgaussian.github.io/
  Tags: Compression
  Key: In novel view synthesis of scenes from multiple input views, 3D Gaussian splatting emerges as a viable alternative to existing radiance field approaches, delivering great visual quality and real-time

- Title: Real-time Photorealistic Dynamic Scene Representation and Rendering with 4D Gaussian Splatting
  Authors: Zeyu Yang, Hongye Yang, Zijie Pan, Xiatian Zhu, Li Zhang
  Year: 2023
  ArXiv: 2310.10642
  Code: https://github.com/fudan-zvg/4d-gaussian-splatting
  Project: https://fudan-zvg.github.io/4d-gaussian-splatting/
  Key: Reconstructing dynamic 3D scenes from 2D images and generating diverse views over time is challenging due to scene complexity and temporal dynamics. Despite advancements in neural implicit models, lim

- Title: 4D Gaussian Splatting for Real-Time Dynamic Scene Rendering
  Authors: Guanjun Wu, Taoran Yi, Jiemin Fang, Lingxi Xie, Xiaopeng Zhang, Wei Wei, Wenyu Liu, Tian Qi, Xinggang Wang
  Year: 2023
  ArXiv: 2310.08528
  Code: https://github.com/hustvl/4DGaussians
  Project: https://guanjunwu.github.io/4dgs/
  Key: Representing and rendering dynamic scenes has been an important but challenging task. Especially, to accurately model complex motions, high efficiency is usually hard to maintain. We introduce the 4D

- Title: Gaussian-Flow: 4D Reconstruction with Dynamic 3D Gaussian Particle
  Authors: Youtian Lin, Zuozhuo Dai, Siyu Zhu, Yao Yao
  Year: 2023
  ArXiv: 2310.08528
  Code: https://github.com/NJU-3DV/Gaussian-Flow
  Project: https://nju-3dv.github.io/projects/Gaussian-Flow
  Key: We introduce Gaussian-Flow, a novel point-based approach for fast dynamic scene reconstruction and real-time rendering from both multi-view and monocular videos. In contrast to the prevalent NeRF-base

- Title: Dynamic 3D Gaussians: Tracking by Persistent Dynamic View Synthesis
  Authors: Jonathon Luiten, Georgios Kopanas, Bastian Leibe, Deva Ramanan
  Year: 2023
  ArXiv: 2308.09713
  Code: https://github.com/JonathonLuiten/Dynamic3DGaussians
  Project: https://dynamic3dgaussians.github.io/
  Key: We present a method that simultaneously addresses the tasks of dynamic scene novel-view synthesis and six degree-of-freedom (6-DOF) tracking of all dense scene elements. We follow an analysis-by-synth

- Title: Gaussian Splatting for Real-Time Radiance Field Rendering
  Authors: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, George Drettakis
  Year: 2023
  ArXiv: 2308.04079
  Code: https://github.com/graphdeco-inria/gaussian-splatting
  Project: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
  Tags: Classic Work, Rendering
  Key: Radiance Field methods have recently revolutionized novel-view synthesis of scenes captured with multiple photos or videos. However, achieving high visual quality still requires neural networks that a

- Title: Control4D: Efficient 4D Portrait Editing with Text
  Authors: Ruizhi Shao, Jingxiang Sun, Cheng Peng, Zerong Zheng, Boyao Zhou, Hongwen Zhang, Yebin Liu
  Year: 2023
  ArXiv: 2305.20082
  Project: https://control4darxiv.github.io/
  Tags: Editing
  Key: We introduce Control4D, an innovative framework for editing dynamic 4D portraits using text instructions. Our method addresses the prevalent challenges in 4D editing, notably the inefficiencies of exi

- Title: Instruct-4DGS: Efficient Dynamic Scene Editing via 4D Gaussian-based Static-Dynamic Separation
  Authors: Joohyun Kwon, Hanbyel Cho, Junmo Kim
  Year: 2025
  ArXiv: 2502.02091
  Project: https://hanbyelcho.info/instruct-4dgs/
  Tags: Diffusion, Rendering, Editing
  Key: Recent 4D dynamic scene editing methods require editing thousands of 2D images used for dynamic scene synthesis and updating the entire scene with additional training loops, resulting in several hours

================================================================================
CATEGORY: Editing (23 papers)
================================================================================

- Title: Motion Blender Gaussian Splatting for Dynamic Scene Reconstruction
  Authors: Xinyu Zhang, Haonan Chang, Yuhan Liu, Abdeslam Boularias
  Year: 2025
  ArXiv: 2503.09040
  Code: https://github.com/mlzxy/motion-blender-gs
  Project: https://mlzxy.github.io/motion-blender-gs/
  Tags: Dynamic, Robotics, Segmentation
  Key: Gaussian splatting has emerged as a powerful tool for high-fidelity reconstruction of dynamic scenes. However, existing methods primarily rely on implicit motion representations, such as encoding moti

- Title: Object-Centric 2D Gaussian Splatting: Background Removal and Occlusion-Aware Pruning for Compact Object Models
  Authors: Marcel Rogge, Didier Stricker
  Year: 2025
  ArXiv: 2501.08174
  Tags: Compression, Densification
  Key: Current Gaussian Splatting approaches are effective for reconstructing entire scenes but lack the option to target specific objects, making them computationally expensive and unsuitable for object-spe

- Title: Interactive Scene Authoring with Specialized Generative Primitives
  Authors: Clément Jambon, Changwoon Choi, Dongsu Zhang, Olga Sorkine-Hornung, Young Min Kim
  Year: 2024
  ArXiv: 2412.16253
  Tags: World Generation
  Key: Generating high-quality 3D digital assets often requires expert knowledge of complex design tools. We introduce Specialized Generative Primitives, a generative framework that allows non-expert users t

- Title: FATE: Full-head Gaussian Avatar with Textural Editing from Monocular Video
  Authors: Jiawei Zhang, Zijian Wu, Zhiyang Liang, Yicheng Gong, Dongfang Hu, Yao Yao, Xun Cao, Hao Zhu
  Year: 2024
  ArXiv: 2411.15604
  Code: https://github.com/zjwfufu/FateAvatar
  Project: https://zjwfufu.github.io/FATE-page/
  Tags: Avatar, Dynamic, Monocular, Texturing
  Key: Reconstructing high-fidelity, animatable 3D head avatars from effortlessly captured monocular videos is a pivotal yet formidable challenge. Although significant progress has been made in rendering per

- Title: Gradient-Weighted Feature Back-Projection: A Fast Alternative to Feature Distillation in 3D Gaussian Splatting
  Authors: Joji Joseph, Bharadwaj Amrutur, Shalabh Bhatnagar
  Year: 2024
  ArXiv: 2411.15193
  Code: https://github.com/JojiJoseph/3dgs-gradient-backprojection
  Project: https://jojijoseph.github.io/3dgs-backprojection/
  Tags: Language Embedding, Segmentation
  Key: We introduce a training-free method for feature field rendering in Gaussian splatting. Our approach back-projects 2D features into pre-trained 3D Gaussians, using a weighted sum based on each Gaussian

- Title: ICE-G: Image Conditional Editing of 3D Gaussian Splats
  Authors: Vishnu Jaganathan, Hannah Huang, Muhammad Zubair Irshad, Varun Jampani, Amit Raj, Zsolt Kira
  Year: 2024
  ArXiv: 2406.08488
  Project: https://ice-gaussian.github.io/
  Key: Recently many techniques have emerged to create high quality 3D assets and scenes. When it comes to editing of these objects, however, existing approaches are either slow, compromise on quality, or do

- Title: InFusion: Inpainting 3D Gaussians via Learning Depth Completion from Diffusion Prior
  Authors: Zhiheng Liu, Hao Ouyang, Qiuyu Wang, Ka Leong Cheng, Jie Xiao, Kai Zhu, Nan Xue, Yu Liu, Yujun Shen, Yang Cao
  Year: 2024
  ArXiv: 2404.11613
  Code: https://github.com/ali-vilab/infusion
  Project: https://johanan528.github.io/Infusion/
  Tags: Inpainting
  Key: 3D Gaussians have recently emerged as an efficient representation for novel view synthesis. This work studies its editability with a particular focus on the inpainting task, which aims to supplement a

- Title: Gaga: Group Any Gaussians via 3D-aware Memory Bank
  Authors: Weijie Lyu, Xueting Li, Abhijit Kundu, Yi-Hsuan Tsai, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2404.07977
  Code: https://github.com/weijielyu/Gaga
  Project: https://www.gaga.gallery/
  Tags: Segmentation
  Key: We introduce Gaga, a framework that reconstructs and segments open-world 3D scenes by leveraging inconsistent 2D masks predicted by zero-shot segmentation models. Contrasted to prior 3D scene segmenta

- Title: Feature Splatting: Language-Driven Physics-Based Scene Synthesis and Editing
  Authors: Ri-Zhao Qiu, Ge Yang, Weijia Zeng, Xiaolong Wang
  Year: 2024
  ArXiv: 2404.01223
  Code: https://github.com/vuer-ai/feature_splatting
  Project: https://feature-splatting.github.io/
  Tags: Language Embedding, Physics, Segmentation
  Key: Scene representations using 3D Gaussian primitives have produced excellent results in modeling the appearance of static and dynamic 3D scenes. Many graphics applications, however, demand the ability t

- Title: Gaussian Frosting: Editable Complex Radiance Fields with Real-Time Rendering
  Authors: Antoine Guédon, Vincent Lepetit
  Year: 2024
  ArXiv: 2403.14554
  Code: https://github.com/Anttwo/Frosting
  Project: https://anttwo.github.io/frosting/
  Tags: Dynamic, Meshing
  Key: We propose Gaussian Frosting, a novel mesh-based representation for high-quality rendering and editing of complex 3D effects in real-time. Our approach builds on the recent 3D Gaussian Splatting frame

- Title: View-Consistent 3D Editing with Gaussian Splatting
  Authors: Yuxuan Wang, Xuanyu Yi, Zike Wu, Na Zhao, Long Chen, Hanwang Zhang
  Year: 2024
  ArXiv: 2403.11868
  Project: https://vcedit.github.io/
  Key: The advent of 3D Gaussian Splatting (3DGS) has revolutionized 3D editing, offering efficient, high-fidelity rendering and enabling precise local manipulations. Currently, diffusion-based 2D editing mo

- Title: Texture-GS: Disentangling the Geometry and Texture for 3D Gaussian Splatting Editing
  Authors: Tian-Xing Xu, Wenbo Hu, Yu-Kun Lai, Ying Shan, Song-Hai Zhang
  Year: 2024
  ArXiv: 2403.10050
  Code: https://github.com/slothfulxtx/Texture-GS
  Project: https://slothfulxtx.github.io/TexGS/
  Tags: Texturing
  Key: 3D Gaussian splatting, emerging as a groundbreaking approach, has drawn increasing attention for its capabilities of high-fidelity reconstruction and real-time rendering. However, it couples the appea

- Title: GaussCtrl: Multi-View Consistent Text-Driven 3D Gaussian Splatting Editing
  Authors: Jing Wu, Jia-Wang Bian, Xinghui Li, Guangrun Wang, Ian Reid, Philip Torr, Victor Adrian Prisacariu
  Year: 2024
  ArXiv: 2403.08733
  Code: https://github.com/ActiveVisionLab/gaussctrl
  Project: https://gaussctrl.active.vision/
  Key: We propose GaussCtrl, a text-driven method to edit a 3D scene reconstructed by the 3D Gaussian Splatting (3DGS). Our method first renders a collection of images by using the 3DGS and edits them by usi

- Title: GSEdit: Efficient Text-Guided Editing of 3D Objects via Gaussian Splatting
  Authors: Francesco Palandra, Andrea Sanchietti, Daniele Baieri, Emanuele Rodolà
  Year: 2024
  ArXiv: 2403.05154
  Key: We present GSEdit, a pipeline for text-guided 3D object editing based on Gaussian Splatting models. Our method enables the editing of the style and appearance of 3D objects without altering their main

- Title: TIP-Editor: An Accurate 3D Editor Following Both Text-Prompts And Image-Prompts
  Authors: Jingyu Zhuang, Di Kang, Yan-Pei Cao, Guanbin Li, Liang Lin, Ying Shan
  Year: 2024
  ArXiv: 2401.14828
  Code: https://github.com/zjy526223908/TIP-Editor
  Project: https://zjy526223908.github.io/TIP-Editor/
  Key: Text-driven 3D scene editing has gained significant attention owing to its convenience and user-friendliness. However, existing methods still lack accurate control of the specified appearance and loca

- Title: Feature 3DGS: Supercharging 3D Gaussian Splatting to Enable Distilled Feature Fields
  Authors: Shijie Zhou, Haoran Chang, Sicheng Jiang, Zhiwen Fan, Zehao Zhu, Dejia Xu, Pradyumna Chari, Suya You, Zhangyang Wang, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.03203
  Code: https://github.com/ShijieZhou-UCLA/feature-3dgs
  Project: https://feature-3dgs.github.io/
  Tags: Inpainting, Language Embedding, Segmentation
  Key: 3D scene representations have gained immense popularity in recent years. Methods that use Neural Radiance fields are versatile for traditional tasks such as novel view synthesis. In recent times, some

- Title: Segment Any 3D Gaussians
  Authors: Jiazhong Cen, Jiemin Fang, Chen Yang, Lingxi Xie, Xiaopeng Zhang, Wei Shen, Qi Tian
  Year: 2023
  ArXiv: 2312.00860
  Code: https://github.com/Jumpat/SegAnyGAussians
  Project: https://jumpat.github.io/SAGA/
  Tags: Segmentation
  Key: Interactive 3D segmentation in radiance fields is an appealing task since its importance in 3D scene understanding and manipulation. However, existing methods face challenges in either achieving fine-

- Title: Gaussian Grouping: Segment and Edit Anything in 3D Scenes
  Authors: Mingqiao Ye, Martin Danelljan, Fisher Yu, Lei Ke
  Year: 2023
  ArXiv: 2312.00732
  Code: https://github.com/lkeab/gaussian-grouping
  Project: https://ymq2017.github.io/gaussian-grouping/
  Tags: Segmentation
  Key: The recent Gaussian Splatting achieves high-quality and real-time novel-view synthesis of the 3D scenes. However, it is solely concentrated on the appearance and geometry modeling, while lacking in fi

- Title: Point'n Move: Interactive Scene Object Manipulation on Gaussian Splatting Radiance Fields
  Authors: Jiajun Huang, Hongchuan Yu
  Year: 2023
  ArXiv: 2311.16737
  Key: We propose Point'n Move, a method that achieves interactive scene object manipulation with exposed region inpainting. Interactivity here further comes from intuitive object selection and real-time edi

- Title: GaussianEditor: Editing 3D Gaussians Delicately with Text Instructions
  Authors: Jiemin Fang, Junjie Wang, Xiaopeng Zhang, Lingxi Xie, Qi Tian
  Year: 2023
  ArXiv: 2311.16037
  Project: https://gaussianeditor.github.io/
  Key: Recently, impressive results have been achieved in 3D scene editing with text instructions based on a 2D diffusion model. However, current diffusion models primarily generate images by predicting nois

- Title: GaussianEditor: Swift and Controllable 3D Editing with Gaussian Splatting
  Authors: Yiwen Chen, Zilong Chen, Chi Zhang, Feng Wang, Xiaofeng Yang, Yikai Wang, Zhongang Cai, Lei Yang, Huaping Liu, Guosheng Lin
  Year: 2023
  ArXiv: 2311.14521
  Code: https://github.com/buaacyw/GaussianEditor
  Project: https://buaacyw.github.io/gaussian-editor/
  Key: 3D editing plays a crucial role in many areas such as gaming and virtual reality. Traditional 3D editing methods, which rely on representations like meshes and point clouds, often fall short in realis

- Title: Control4D: Efficient 4D Portrait Editing with Text
  Authors: Ruizhi Shao, Jingxiang Sun, Cheng Peng, Zerong Zheng, Boyao Zhou, Hongwen Zhang, Yebin Liu
  Year: 2023
  ArXiv: 2305.20082
  Project: https://control4darxiv.github.io/
  Tags: Dynamic
  Key: We introduce Control4D, an innovative framework for editing dynamic 4D portraits using text instructions. Our method addresses the prevalent challenges in 4D editing, notably the inefficiencies of exi

- Title: Instruct-4DGS: Efficient Dynamic Scene Editing via 4D Gaussian-based Static-Dynamic Separation
  Authors: Joohyun Kwon, Hanbyel Cho, Junmo Kim
  Year: 2025
  ArXiv: 2502.02091
  Project: https://hanbyelcho.info/instruct-4dgs/
  Tags: Dynamic, Diffusion, Rendering
  Key: Recent 4D dynamic scene editing methods require editing thousands of 2D images used for dynamic scene synthesis and updating the entire scene with additional training loops, resulting in several hours

================================================================================
CATEGORY: Feed-Forward (23 papers)
================================================================================

- Title: SparseSplat: Towards Applicable Feed-Forward 3D Gaussian Splatting with Pixel-Unaligned Prediction
  Authors: Zicheng Zhang, Xiangting Meng, Ke Wu, Wenchao Ding
  Year: 2026
  ArXiv: 2604.03069
  Project: https://victkk.github.io/SparseSplat-page/
  Tags: Sparse
  Key: Recent progress in feed-forward 3D Gaussian Splatting (3DGS) has notably improved rendering quality. However, the spatially uniform and highly redundant 3DGS map generated by previous feed-forward 3DG

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Diffusion, Dynamic, Gaussian Video, Virtual Reality, World Generation
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: Learning Unified Representation of 3D Gaussian Splatting
  Authors: Yuelin Xin, Yuheng Liu, Xiaohui Xie, Xinke Li
  Year: 2025
  ArXiv: 2509.22917
  Code: https://github.com/cilix-ai/gs-embedding
  Project: https://cilix-ai.github.io/gs-embedding-page/
  Tags: Compression, Point Cloud, Segmentation
  Key: A well-designed vectorized representation is crucial for the learning systems natively based on 3D Gaussian Splatting. While 3DGS enables efficient and explicit 3D reconstruction, its parameter-based

- Title: MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian Splatting
  Authors: Hanzhi Chang, Ruijie Zhu, Wenjie Chang, Mulin Yu, Yanzhe Liang, Jiahao Lu, Zhuoyuan Li, Tianzhu Zhang
  Year: 2025
  ArXiv: 2508.17811
  Project: https://hanzhichang.github.io/meshsplat_web/
  Tags: 2DGS, Meshing
  Key: Surface reconstruction has been widely studied in computer vision and graphics. However, existing surface reconstruction works struggle to recover accurate scene geometry when the input views are extr

- Title: Zero-Shot Novel View and Depth Synthesis with Multi-View Geometric Diffusion
  Authors: Vitor Guizilini, Muhammad Zubair Irshad, Dian Chen, Greg Shakhnarovich, Rares Ambrus
  Year: 2025
  ArXiv: 2501.18804
  Project: https://mvgd.github.io/
  Tags: 360 degree, Diffusion, Large-Scale, Point Cloud
  Key: Current methods for 3D scene reconstruction from sparse posed images employ intermediate 3D representations such as neural fields, voxel grids, or 3D Gaussians, to achieve multi-view consistent scene

- Title: F3D-Gaus: Feed-forward 3D-aware Generation on ImageNet with Cycle-Consistent Gaussian Splatting
  Authors: Yuxin Wang, Qianyi Wu, Dan Xu
  Year: 2025
  ArXiv: 2501.06714
  Code: https://github.com/W-Ted/F3D-Gaus
  Project: https://arxiv.org/abs/2501.06714
  Tags: Monocular
  Key: This paper tackles the problem of generalizable 3D-aware generation from monocular datasets, e.g., ImageNet. The key challenge of this task is learning a robust 3D-aware representation without multi-v

- Title: DreamDrive: Generative 4D Scene Modeling from Street View Images
  Authors: Jiageng Mao, Boyi Li, Boris Ivanovic, Yuxiao Chen, Yan Wang, Yurong You, Chaowei Xiao, Danfei Xu, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2501.00601
  Tags: Autonomous Driving, Dynamic
  Key: Synthesizing photo-realistic visual observations from an ego vehicle's driving trajectory is a critical step towards scalable training of self-driving models. Reconstruction-based methods create 3D sc

- Title: FaceLift: Single Image to 3D Head with View Generation and GS-LRM
  Authors: Weijie Lyu, Yi Zhou, Ming-Hsuan Yang, Zhixin Shu
  Year: 2024
  ArXiv: 2412.17812
  Project: https://www.wlyu.me/FaceLift/
  Tags: Avatar
  Key: We present FaceLift, a feed-forward approach for rapid, high-quality, 360-degree head reconstruction from a single image. Our pipeline begins by employing a multi-view latent diffusion model that gene

- Title: PanSplat: 4K Panorama Synthesis with Feed-Forward Gaussian Splatting
  Authors: Cheng Zhang, Haofei Xu, Qianyi Wu, Camilo Cruz Gambardella, Dinh Phung, Jianfei Cai
  Year: 2024
  ArXiv: 2412.12096
  Code: https://github.com/chengzhag/PanSplat
  Project: https://chengzhag.github.io/publication/pansplat/
  Tags: 360 degree, World Generation
  Key: With the advent of portable 360{\deg} cameras, panorama has gained significant attention in applications like virtual reality (VR), virtual tours, robotics, and autonomous driving. As a result, wide-b

- Title: Wonderland: Navigating 3D Scenes from a Single Image
  Authors: Hanwen Liang, Junli Cao, Vidit Goel, Guocheng Qian, Sergei Korolev, Demetri Terzopoulos, Konstantinos N. Plataniotis, Sergey Tulyakov, Jian Ren
  Year: 2024
  ArXiv: 2412.12091
  Project: https://snap-research.github.io/wonderland/
  Tags: Sparse, World Generation
  Key: This paper addresses a challenging question: How can we efficiently create high-quality, wide-scope 3D scenes from a single arbitrary image? Existing methods face several constraints, such as requirin

- Title: Feed-Forward Bullet-Time Reconstruction of Dynamic Scenes from Monocular Videos
  Authors: Hanxue Liang, Jiawei Ren, Ashkan Mirzaei, Antonio Torralba, Ziwei Liu, Igor Gilitschenski, Sanja Fidler, Cengiz Oztireli, Huan Ling, Zan Gojcic, Jiahui Huang
  Year: 2024
  ArXiv: 2412.03526
  Tags: Dynamic, Monocular
  Key: Recent advancements in static feed-forward scene reconstruction have demonstrated significant progress in high-quality novel view synthesis. However, these models often struggle with generalizability

- Title: SelfSplat: Pose-Free and 3D Prior-Free Generalizable 3D Gaussian Splatting
  Authors: Gyeongjin Kang, Jisang Yoo, Jihyeon Park, Seungtae Nam, Hyeonsoo Im, Sangheon Shin, Sangpil Kim, Eunbyung Park
  Year: 2024
  ArXiv: 2411.17190
  Code: https://github.com/Gynjn/selfsplat
  Project: https://gynjn.github.io/selfsplat/
  Tags: Poses
  Key: We propose SelfSplat, a novel 3D Gaussian Splatting model designed to perform pose-free and 3D prior-free generalizable 3D reconstruction from unposed multi-view images. These settings are inherently

- Title: Quark: Real-time, High-resolution, and General Neural View Synthesis
  Authors: John Flynn, Michael Broxton, Lukas Murmann, Lucy Chai, Matthew DuVall, Clément Godard, Kathryn Heal, Srinivas Kaza, Stephen Lombardi, Xuan Luo, Supreeth Achar, Kira Prabhu, Tiancheng Sun, Lynn Tsai, Ryan Overbeck
  Year: 2024
  ArXiv: 2411.16680
  Project: https://arxiv.org/abs/2411.16680
  Tags: Rendering
  Key: We present a novel neural algorithm for performing high-quality, high-resolution, real-time novel view synthesis. From a sparse set of input RGB images or videos streams, our network both reconstructs

- Title: Generating 3D-Consistent Videos from Unposed Internet Photos
  Authors: Gene Chou, Kai Zhang, Sai Bi, Hao Tan, Zexiang Xu, Fujun Luan, Bharath Hariharan, Noah Snavely
  Year: 2024
  ArXiv: 2411.13549
  Project: https://genechou.com/kfcw/
  Tags: In the Wild, Poses, Transformer
  Key: We address the problem of generating videos from unposed internet photos. A handful of input images serve as keyframes, and our model interpolates between them to simulate a path moving between the ca

- Title: Large Spatial Model: End-to-end Unposed Images to Semantic 3D
  Authors: Zhiwen Fan, Jian Zhang, Wenyan Cong, Peihao Wang, Renjie Li, Kairun Wen, Shijie Zhou, Achuta Kadambi, Zhangyang Wang, Danfei Xu, Boris Ivanovic, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2410.18956
  Code: https://github.com/NVlabs/LSM
  Project: https://largespatialmodel.github.io/
  Tags: Poses, Segmentation
  Key: Reconstructing and understanding 3D structures from a limited number of images is a well-established problem in computer vision. Traditional methods usually break this task into multiple subtasks, eac

- Title: HiSplat: Hierarchical 3D Gaussian Splatting for Generalizable Sparse-View Reconstruction
  Authors: Shengji Tang, Weicai Ye, Peng Ye, Weihao Lin, Yang Zhou, Tao Chen, Wanli Ouyang
  Year: 2024
  ArXiv: 2410.06245
  Code: https://github.com/Open3DVLab/HiSplat
  Project: https://open3dvlab.github.io/HiSplat/
  Tags: Sparse
  Key: Reconstructing 3D scenes from multiple viewpoints is a fundamental task in stereo vision. Recently, advances in generalizable 3D Gaussian Splatting have enabled high-quality novel view synthesis for u

- Title: SuperGS: Super-Resolution 3D Gaussian Splatting via Latent Feature Field and Gradient-guided Splitting
  Authors: Shiyun Xie, Zhiru Wang, Yinghao Zhu, Chengwei Pan
  Year: 2024
  ArXiv: 2410.02571
  Tags: Densification, Rendering
  Key: Recently, 3D Gaussian Splatting (3DGS) has exceled in novel view synthesis with its real-time rendering capabilities and superior quality. However, it faces challenges for high-resolution novel view s

- Title: TranSplat: Generalizable 3D Gaussian Splatting from Sparse Multi-View Images with Transformers
  Authors: Chuanrui Zhang, Yingshuang Zou, Zhuoling Li, Minmin Yi, Haoqian Wang
  Year: 2024
  ArXiv: 2408.13770
  Code: https://github.com/xingyoujun/transplat
  Project: https://xingyoujun.github.io/transplat/
  Tags: Sparse, Transformer
  Key: Compared with previous 3D reconstruction methods like Nerf, recent Generalizable 3D Gaussian Splatting (G-3DGS) methods demonstrate impressive efficiency even in the sparse-view setting. However, the

- Title: Gamba: Marry Gaussian Splatting with Mamba for single view 3D reconstruction
  Authors: Qiuhong Shen, Xuanyu Yi, Zike Wu, Pan Zhou, Hanwang Zhang, Shuicheng Yan, Xinchao Wang
  Year: 2024
  ArXiv: 2403.18795
  Code: https://github.com/SkyworkAI/Gamba
  Project: https://florinshen.github.io/gamba-project/
  Tags: Sparse
  Key: We tackle the challenge of efficiently reconstructing a 3D asset from a single image with growing demands for automated 3D content creation pipelines. Previous methods primarily rely on Score Distilla

- Title: latentSplat: Autoencoding Variational Gaussians for Fast Generalizable 3D Reconstruction
  Authors: Christopher Wewer, Kevin Raj, Eddy Ilg, Bernt Schiele, Jan Eric Lenssen
  Year: 2024
  ArXiv: 2403.16292
  Code: https://github.com/Chrixtar/latentsplat
  Project: https://geometric-rl.mpi-inf.mpg.de/latentsplat/
  Tags: Sparse
  Key: We present latentSplat, a method to predict semantic Gaussians in a 3D latent space that can be splatted and decoded by a light-weight generative 2D architecture. Existing methods for generalizable 3D

- Title: MVSplat: Efficient 3D Gaussian Splatting from Sparse Multi-View Images
  Authors: Yuedong Chen, Haofei Xu, Chuanxia Zheng, Bohan Zhuang, Marc Pollefeys, Andreas Geiger, Tat-Jen Cham, Jianfei Cai
  Year: 2024
  ArXiv: 2403.14627
  Code: https://github.com/donydchen/mvsplat
  Project: https://donydchen.github.io/mvsplat/
  Tags: Sparse
  Key: We propose MVSplat, an efficient feed-forward 3D Gaussian Splatting model learned from sparse multi-view images. To accurately localize the Gaussian centers, we propose to build a cost volume represen

- Title: Splatter Image: Ultra-Fast Single-View 3D Reconstruction
  Authors: Stanislaw Szymanowicz, Christian Rupprecht, Andrea Vedaldi
  Year: 2023
  ArXiv: 2312.13150
  Code: https://github.com/szymanowiczs/splatter-image
  Project: https://szymanowiczs.github.io/splatter-image.html
  Tags: Sparse
  Key: We introduce the Splatter Image, an ultra-fast approach for monocular 3D object reconstruction which operates at 38 FPS. Splatter Image is based on Gaussian Splatting, which has recently brought real-

- Title: pixelSplat: 3D Gaussian Splats from Image Pairs for Scalable Generalizable 3D Reconstruction
  Authors: David Charatan, Sizhe Li, Andrea Tagliasacchi, Vincent Sitzmann
  Year: 2023
  ArXiv: 2312.12337
  Code: https://github.com/dcharatan/pixelsplat
  Project: https://davidcharatan.com/pixelsplat/
  Tags: Sparse
  Key: We introduce pixelSplat, a feed-forward model that learns to reconstruct 3D radiance fields parameterized by 3D Gaussian primitives from pairs of images. Our model features real-time and memory-effici

================================================================================
CATEGORY: GAN (3 papers)
================================================================================

- Title: PERSE: Personalized 3D Generative Avatars from A Single Portrait
  Authors: Hyunsoo Cha, Inhee Lee, Hanbyul Joo
  Year: 2024
  ArXiv: 2412.21206
  Project: https://hyunsoocha.github.io/perse/
  Tags: Avatar
  Key: We present PERSE, a method for building an animatable personalized generative avatar from a reference portrait. Our avatar model enables facial attribute editing in a continuous and disentangled laten

- Title: GGHead: Fast and Generalizable 3D Gaussian Heads
  Authors: Tobias Kirschstein, Simon Giebenhain, Jiapeng Tang, Markos Georgopoulos, Matthias Nießner
  Year: 2024
  ArXiv: 2406.09377
  Code: https://github.com/tobias-kirschstein/gghead
  Project: https://tobias-kirschstein.github.io/gghead/
  Key: Learning 3D head priors from large 2D image collections is an important step towards high-quality 3D-aware human modeling. A core requirement is an efficient architecture that scales well to large-sca

- Title: Adversarial Generation of Hierarchical Gaussians for 3d Generative Model
  Authors: Sangeek Hyun, Jae-Pil Heo
  Year: 2024
  ArXiv: 2406.02968
  Code: https://github.com/hse1032/GSGAN
  Project: https://hse1032.github.io/gsgan
  Key: Most advances in 3D Generative Adversarial Networks (3D GANs) largely depend on ray casting-based volume rendering, which incurs demanding rendering costs. One promising alternative is rasterization-b

================================================================================
CATEGORY: Gaussian Video (2 papers)
================================================================================

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Diffusion, Dynamic, Feed-Forward, Virtual Reality, World Generation
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: GaussianVideo: Efficient Video Representation via Hierarchical Gaussian Splatting
  Authors: Andrew Bond, Jui-Hsien Wang, Long Mai, Erkut Erdem, Aykut Erdem
  Year: 2025
  ArXiv: 2501.04782
  Project: https://cyberiada.github.io/GaussianVideo/
  Key: Efficient neural representations for dynamic video scenes are critical for applications ranging from video compression to interactive simulations. Yet, existing methods often face challenges related t

================================================================================
CATEGORY: In the Wild (10 papers)
================================================================================

- Title: Micro-macro Wavelet-based Gaussian Splatting for 3D Reconstruction from Unconstrained Images
  Authors: Yihui Li, Chengxin Lv, Hongyu Yang, Di Huang
  Year: 2025
  ArXiv: 2501.14231
  Key: 3D reconstruction from unconstrained image collections presents substantial challenges due to varying appearances and transient occlusions. In this paper, we introduce Micro-macro Wavelet-based Gaussi

- Title: DehazeGS: Seeing Through Fog with 3D Gaussian Splatting
  Authors: Jinze Yu, Yiqun Wang, Zhengda Lu, Jianwei Guo, Yong Li, Hongxing Qin, Xiaopeng Zhang
  Year: 2025
  ArXiv: 2501.03659
  Tags: Rendering
  Key: Current novel view synthesis tasks primarily rely on high-quality and clear images. However, in foggy scenes, scattering and attenuation can significantly degrade the reconstruction and rendering qual

- Title: GSplatLoc: Ultra-Precise Camera Localization via 3D Gaussian Splatting
  Authors: Atticus J. Zeller
  Year: 2024
  ArXiv: 2412.20056
  Code: https://github.com/AtticusZeller/GsplatLoc
  Tags: Point Cloud, Poses, Robotics, SLAM
  Key: We present GSplatLoc, a camera localization method that leverages the differentiable rendering capabilities of 3D Gaussian splatting for ultra-precise pose estimation. By formulating pose estimation a

- Title: WeatherGS: 3D Scene Reconstruction in Adverse Weather Conditions via Gaussian Splatting
  Authors: Chenghao Qian, Yuhu Guo, Wenjing Li, Gustav Markkula
  Year: 2024
  ArXiv: 2412.18862
  Code: https://github.com/Jumponthemoon/WeatherGS
  Key: 3D Gaussian Splatting (3DGS) has gained significant attention for 3D scene reconstruction, but still suffers from complex outdoor environments, especially under adverse weather. This is because 3DGS t

- Title: NeRF and Gaussian Splatting SLAM in the Wild
  Authors: Fabian Schmidt, Markus Enzweiler, Abhinav Valada
  Year: 2024
  ArXiv: 2412.03263
  Code: https://github.com/iis-esslingen/nerf-3dgs-benchmark
  Tags: Review, SLAM
  Key: Navigating outdoor environments with visual Simultaneous Localization and Mapping (SLAM) systems poses significant challenges due to dynamic scenes, lighting variations, and seasonal changes, requirin

- Title: Textured Gaussians for Enhanced 3D Scene Appearance Modeling
  Authors: Brian Chao, Hung-Yu Tseng, Lorenzo Porzi, Chen Gao, Tuotuo Li, Qinbo Li, Ayush Saraf, Jia-Bin Huang, Johannes Kopf, Gordon Wetzstein, Changil Kim
  Year: 2024
  ArXiv: 2411.18625
  Project: https://textured-gaussians.github.io/
  Tags: Rendering, Texturing
  Key: 3D Gaussian Splatting (3DGS) has recently emerged as a state-of-the-art 3D reconstruction and rendering technique due to its high-quality results and fast training and rendering time. However, pixels

- Title: Generating 3D-Consistent Videos from Unposed Internet Photos
  Authors: Gene Chou, Kai Zhang, Sai Bi, Hao Tan, Zexiang Xu, Fujun Luan, Bharath Hariharan, Noah Snavely
  Year: 2024
  ArXiv: 2411.13549
  Project: https://genechou.com/kfcw/
  Tags: Feed-Forward, Poses, Transformer
  Key: We address the problem of generating videos from unposed internet photos. A handful of input images serve as keyframes, and our model interpolates between them to simulate a path moving between the ca

- Title: LumiGauss: Relightable Gaussian Splatting in the Wild
  Authors: Joanna Kaleta, Kacper Kania, Tomasz Trzcinski, Marek Kowalski
  Year: 2024
  ArXiv: 2408.04474
  Code: https://github.com/joaxkal/lumigauss
  Project: https://lumigauss.github.io/
  Tags: Relight
  Key: Decoupling lighting from geometry using unconstrained photo collections is notoriously challenging. Solving it would benefit many users as creating complex 3D assets takes days of manual labor. Many p

- Title: Gaussian in the Wild: 3D Gaussian Splatting for Unconstrained Image Collections
  Authors: Dongbin Zhang, Chuming Wang, Weitao Wang, Peihao Li, Minghan Qin, Haoqian Wang
  Year: 2024
  ArXiv: 2403.15704
  Code: https://github.com/EastbeanZhang/Gaussian-Wild
  Project: https://eastbeanzhang.github.io/GS-W/
  Tags: Rendering
  Key: Novel view synthesis from unconstrained in-the-wild images remains a meaningful but challenging task. The photometric variation and transient occluders in those unconstrained images make it difficult

- Title: SWAG: Splatting in the Wild images with Appearance-conditioned Gaussians
  Authors: Hiba Dahmani, Moussab Bennehar, Nathan Piasco, Luis Roldao, Dzmitry Tsishkou
  Year: 2024
  ArXiv: 2403.10427
  Tags: Rendering
  Key: Implicit neural representation methods have shown impressive advancements in learning 3D scenes from unstructured in-the-wild photo collections but are still limited by the large computational cost of

================================================================================
CATEGORY: Inpainting (3 papers)
================================================================================

- Title: Dust to Tower: Coarse-to-Fine Photo-Realistic Scene Reconstruction from Sparse Uncalibrated Images
  Authors: Xudong Cai, Yongcai Wang, Zhaoxin Fan, Deng Haoran, Shuo Wang, Wanting Li, Deying Li, Lun Luo, Minhang Wang, Jintao Xu
  Year: 2024
  ArXiv: 2412.19518
  Tags: Poses, Sparse
  Key: Photo-realistic scene reconstruction from sparse-view, uncalibrated images is highly required in practice. Although some successes have been made, existing methods are either Sparse-View but require a

- Title: InFusion: Inpainting 3D Gaussians via Learning Depth Completion from Diffusion Prior
  Authors: Zhiheng Liu, Hao Ouyang, Qiuyu Wang, Ka Leong Cheng, Jie Xiao, Kai Zhu, Nan Xue, Yu Liu, Yujun Shen, Yang Cao
  Year: 2024
  ArXiv: 2404.11613
  Code: https://github.com/ali-vilab/infusion
  Project: https://johanan528.github.io/Infusion/
  Tags: Editing
  Key: 3D Gaussians have recently emerged as an efficient representation for novel view synthesis. This work studies its editability with a particular focus on the inpainting task, which aims to supplement a

- Title: Feature 3DGS: Supercharging 3D Gaussian Splatting to Enable Distilled Feature Fields
  Authors: Shijie Zhou, Haoran Chang, Sicheng Jiang, Zhiwen Fan, Zehao Zhu, Dejia Xu, Pradyumna Chari, Suya You, Zhangyang Wang, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.03203
  Code: https://github.com/ShijieZhou-UCLA/feature-3dgs
  Project: https://feature-3dgs.github.io/
  Tags: Editing, Language Embedding, Segmentation
  Key: 3D scene representations have gained immense popularity in recent years. Methods that use Neural Radiance fields are versatile for traditional tasks such as novel view synthesis. In recent times, some

================================================================================
CATEGORY: Language Embedding (22 papers)
================================================================================

- Title: LEGO-SLAM: Language-Embedded Gaussian Optimization SLAM
  Authors: Sibaek Lee, Seongbo Ha, Kyeongsu Kang, Joonyeol Choi, Seungjun Tak, Hyeonwoo Yu
  Year: 2025
  ArXiv: 2511.16144
  Code: https://github.com/Lab-of-AI-and-Robotics/LEGO-SLAM
  Project: https://lab-of-ai-and-robotics.github.io/LEGO-SLAM/
  Tags: SLAM, Robotics, Segmentation
  Key: Recent advances in 3D Gaussian Splatting (3DGS) have enabled Simultaneous Localization and Mapping (SLAM) systems to build photorealistic maps. However, these maps lack the open-vocabulary semantic un

- Title: ObjectGS: Object-aware Scene Reconstruction and Scene Understanding via Gaussian Splatting
  Authors: Ruijie Zhu, Mulin Yu, Linning Xu, Lihan Jiang, Yixuan Li, Tianzhu Zhang, Jiangmiao Pang, Bo Dai
  Year: 2025
  ArXiv: 2507.15454
  Code: https://github.com/RuijieZhu94/ObjectGS
  Project: https://ruijiezhu94.github.io/ObjectGS_page/
  Tags: Segmentation
  Key: 3D Gaussian Splatting is renowned for its high-fidelity reconstructions and real-time novel view synthesis, yet its lack of semantic understanding limits object-level perception. In this work, we prop

- Title: Persistent Object Gaussian Splat (POGS) for Tracking Human and Robot Manipulation of Irregularly Shaped Objects
  Authors: Justin Yu, Kush Hari, Karim El-Refai, Arnav Dalal, Justin Kerr, Chung Min Kim, Richard Cheng, Muhammad Zubair Irshad, Ken Goldberg
  Year: 2025
  ArXiv: 2503.05189
  Code: https://github.com/uynitsuj/pogs
  Project: https://berkeleyautomation.github.io/POGS/
  Tags: Robotics, Segmentation
  Key: Tracking and manipulating irregularly-shaped, previously unseen objects in dynamic environments is important for robotic applications in manufacturing, assembly, and logistics. Recently introduced Gau

- Title: Lifting by Gaussians: A Simple, Fast and Flexible Method for 3D Instance Segmentation
  Authors: Rohan Chacko, Nicolai Haeni, Eldar Khaliullin, Lin Sun, Douglas Lee
  Year: 2025
  ArXiv: 2502.00173
  Tags: Segmentation, Virtual Reality
  Key: We introduce Lifting By Gaussians (LBG), a novel approach for open-world instance segmentation of 3D Gaussian Splatted Radiance Fields (3DGS). Recently, 3DGS Fields have emerged as a highly efficient

- Title: CityLoc: 6 DoF Localization of Text Descriptions in Large-Scale Scenes with Gaussian Representation
  Authors: Qi Ma, Runyi Yang, Bin Ren, Ender Konukoglu, Luc Van Gool, Danda Pani Paudel
  Year: 2025
  ArXiv: 2501.08982
  Tags: Large-Scale
  Key: Localizing text descriptions in large-scale 3D scenes is inherently an ambiguous task. This nonetheless arises while describing general concepts, e.g. all traffic lights in a city.   To facilitate rea

- Title: GAGS: Granularity-Aware Feature Distillation for Language Gaussian Splatting
  Authors: Yuning Peng, Haiping Wang, Yuan Liu, Chenglu Wen, Zhen Dong, Bisheng Yang
  Year: 2024
  ArXiv: 2412.13654
  Code: https://github.com/WHU-USI3DV/GAGS
  Project: https://pz0826.github.io/GAGS-Webpage/
  Tags: Segmentation
  Key: 3D open-vocabulary scene understanding, which accurately perceives complex semantic properties of objects in space, has gained significant attention in recent years. In this paper, we propose GAGS, a

- Title: GaussianProperty: Integrating Physical Properties to 3D Gaussians with LMMs
  Authors: Xinli Xu, Wenhang Ge, Dicong Qiu, ZhiFei Chen, Dongyu Yan, Zhuoyun Liu, Haoyu Zhao, Hanfeng Zhao, Shunsi Zhang, Junwei Liang, Ying-Cong Chen
  Year: 2024
  ArXiv: 2412.11258
  Code: https://github.com/xxlbigbrother/Gaussian-Property
  Project: https://gaussian-property.github.io/
  Tags: Robotics
  Key: Estimating physical properties for visual data is a crucial task in computer vision, graphics, and robotics, underpinning applications such as augmented reality, physical simulation, and robotic grasp

- Title: SuperGSeg: Open-Vocabulary 3D Segmentation with Structured Super-Gaussians
  Authors: Siyun Liang, Sen Wang, Kunyi Li, Michael Niemeyer, Stefano Gasperini, Nassir Navab, Federico Tombari
  Year: 2024
  ArXiv: 2412.10231
  Project: https://supergseg.github.io/
  Tags: Segmentation
  Key: 3D Gaussian Splatting has recently gained traction for its efficient training and real-time rendering. While the vanilla Gaussian Splatting representation is mainly designed for view synthesis, more r

- Title: SimAvatar: Simulation-Ready Avatars with Layered Hair and Clothing
  Authors: Xueting Li, Ye Yuan, Shalini De Mello, Gilles Daviet, Jonathan Leaf, Miles Macklin, Jan Kautz, Umar Iqbal
  Year: 2024
  ArXiv: 2412.09545
  Project: https://nvlabs.github.io/SimAvatar/
  Tags: Avatar, Diffusion
  Key: We introduce SimAvatar, a framework designed to generate simulation-ready clothed 3D human avatars from a text prompt. Current text-driven human avatar generation methods either model hair, clothing,

- Title: Occam's LGS: A Simple Approach for Language Gaussian Splatting
  Authors: Jiahuan (Joanna) Cheng, Jan-Nico Zaech, Luc Van Gool, Danda Pani Paudel
  Year: 2024
  ArXiv: 2412.01807
  Project: https://insait-institute.github.io/OccamLGS/
  Tags: Acceleration, Segmentation
  Key: Gaussian Splatting is a widely adopted approach for 3D scene representation that offers efficient, high-quality 3D reconstruction and rendering. A major reason for the success of 3DGS is its simplicit

- Title: Gradient-Weighted Feature Back-Projection: A Fast Alternative to Feature Distillation in 3D Gaussian Splatting
  Authors: Joji Joseph, Bharadwaj Amrutur, Shalabh Bhatnagar
  Year: 2024
  ArXiv: 2411.15193
  Code: https://github.com/JojiJoseph/3dgs-gradient-backprojection
  Project: https://jojijoseph.github.io/3dgs-backprojection/
  Tags: Editing, Segmentation
  Key: We introduce a training-free method for feature field rendering in Gaussian splatting. Our approach back-projects 2D features into pre-trained 3D Gaussians, using a weighted sum based on each Gaussian

- Title: SplaTraj: Camera Trajectory Generation with Semantic Gaussian Splatting
  Authors: Xinyi Liu, Tianyi Zhang, Matthew Johnson-Roberson, Weiming Zhi
  Year: 2024
  ArXiv: 2410.06014
  Tags: Rendering
  Key: Many recent developments for robots to represent environments have focused on photorealistic reconstructions. This paper particularly focuses on generating sequences of images from the photorealistic

- Title: Language-Embedded Gaussian Splats (LEGS): Incrementally Building Room-Scale Representations with a Mobile Robot
  Authors: Justin Yu, Kush Hari, Kishore Srinivas, Karim El-Refai, Adam Rashid, Chung Min Kim, Justin Kerr, Richard Cheng, Muhammad Zubair Irshad, Ashwin Balakrishna, Thomas Kollar, Ken Goldberg
  Year: 2024
  ArXiv: 2409.18108
  Code: https://github.com/BerkeleyAutomation/L3GS
  Project: https://berkeleyautomation.github.io/LEGS/
  Tags: Robotics, Segmentation
  Key: Building semantic 3D maps is valuable for searching for objects of interest in offices, warehouses, stores, and homes. We present a mapping system that incrementally builds a Language-Embedded Gaussia

- Title: Rethinking Open-Vocabulary Segmentation of Radiance Fields in 3D Space
  Authors: Hyunjee Lee*, Youngsik Yun*, Jeongmin Bae, Seoha Kim, Youngjung Uh
  Year: 2024
  ArXiv: 2408.07416
  Code: https://github.com/hyunji12/Open3DRF
  Project: https://hyunji12.github.io/Open3DRF/
  Tags: Segmentation
  Key: Understanding the 3D semantics of a scene is a fundamental problem for various scenarios such as embodied agents. While NeRFs and 3DGS excel at novel-view synthesis, previous methods for understanding

- Title: Query3D: LLM-Powered Open-Vocabulary Scene Segmentation with Language Embedded 3D Gaussian
  Authors: Amirhosein Chahe, Lifeng Zhou
  Year: 2024
  ArXiv: 2408.03516
  Code: https://github.com/Zhourobotics/Query-3DGS-LLM
  Tags: Segmentation
  Key: This paper introduces a novel method for open-vocabulary 3D scene querying in autonomous driving by combining Language Embedded 3D Gaussians with Large Language Models (LLMs). We propose utilizing LLM

- Title: Feature Splatting: Language-Driven Physics-Based Scene Synthesis and Editing
  Authors: Ri-Zhao Qiu, Ge Yang, Weijia Zeng, Xiaolong Wang
  Year: 2024
  ArXiv: 2404.01223
  Code: https://github.com/vuer-ai/feature_splatting
  Project: https://feature-splatting.github.io/
  Tags: Editing, Physics, Segmentation
  Key: Scene representations using 3D Gaussian primitives have produced excellent results in modeling the appearance of static and dynamic 3D scenes. Many graphics applications, however, demand the ability t

- Title: Semantic Gaussians: Open-Vocabulary Scene Understanding with 3D Gaussian Splatting
  Authors: Jun Guo, Xiaojian Ma, Yue Fan, Huaping Liu, Qing Li
  Year: 2024
  ArXiv: 2403.15624
  Code: https://github.com/sharinka0715/semantic-gaussians
  Project: https://semantic-gaussians.github.io/
  Tags: Segmentation
  Key: Open-vocabulary 3D scene understanding presents a significant challenge in computer vision, withwide-ranging applications in embodied agents and augmented reality systems. Previous approaches haveadop

- Title: GaussianGrasper: 3D Language Gaussian Splatting for Open-vocabulary Robotic Grasping
  Authors: Yuhang Zheng, Xiangyu Chen, Yupeng Zheng, Songen Gu, Runyi Yang, Bu Jin, Pengfei Li, Chengliang Zhong, Zengmao Wang, Lina Liu, Chao Yang, Dawei Wang, Zhen Chen, Xiaoxiao Long, Meiqing Wang
  Year: 2024
  ArXiv: 2403.09637
  Code: https://github.com/MrSecant/GaussianGrasper
  Project: https://mrsecant.github.io/GaussianGrasper/
  Tags: Robotics, Segmentation
  Key: Constructing a 3D scene capable of accommodating open-ended language queries, is a pivotal pursuit, particularly within the domain of robotics. Such technology facilitates robots in executing object m

- Title: FMGS: Foundation Model Embedded 3D Gaussian Splatting for Holistic 3D Scene Understanding
  Authors: Xingxing Zuo, Pouya Samangouei, Yunwen Zhou, Yan Di, Mingyang Li
  Year: 2024
  ArXiv: 2401.01970
  Code: https://github.com/google-research/foundation-model-embedded-3dgs
  Project: https://xingxingzuo.github.io/fmgs/
  Tags: Segmentation
  Key: Precisely perceiving the geometric and semantic properties of real-world 3D objects is crucial for the continued evolution of augmented reality and robotic applications. To this end, we present \algfu

- Title: LangSplat: 3D Language Gaussian Splatting
  Authors: Minghan Qin, Wanhua Li, Jiawei Zhou, Haoqian Wang, Hanspeter Pfister
  Year: 2024
  ArXiv: 2312.16084
  Code: https://github.com/minghanqin/LangSplat
  Project: https://langsplat.github.io/
  Tags: Segmentation
  Key: Human lives in a 3D world and commonly uses natural language to interact with a 3D scene. Modeling a 3D language field to support open-ended language queries in 3D has gained increasing attention rece

- Title: Feature 3DGS: Supercharging 3D Gaussian Splatting to Enable Distilled Feature Fields
  Authors: Shijie Zhou, Haoran Chang, Sicheng Jiang, Zhiwen Fan, Zehao Zhu, Dejia Xu, Pradyumna Chari, Suya You, Zhangyang Wang, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.03203
  Code: https://github.com/ShijieZhou-UCLA/feature-3dgs
  Project: https://feature-3dgs.github.io/
  Tags: Editing, Inpainting, Segmentation
  Key: 3D scene representations have gained immense popularity in recent years. Methods that use Neural Radiance fields are versatile for traditional tasks such as novel view synthesis. In recent times, some

- Title: Language Embedded 3D Gaussians for Open-Vocabulary Scene Understanding
  Authors: Jin-Chuan Shi, Miao Wang, Hao-Bin Duan, Shao-Hua Guan
  Year: 2024
  ArXiv: 2311.18482
  Code: https://github.com/buaavrcg/LEGaussians
  Project: https://buaavrcg.github.io/LEGaussians/
  Tags: Segmentation
  Key: Open-vocabulary querying in 3D space is challenging but essential for scene understanding tasks such as object localization and segmentation. Language-embedded scene representations have made progress

================================================================================
CATEGORY: Large-Scale (22 papers)
================================================================================

- Title: Zero-Shot Novel View and Depth Synthesis with Multi-View Geometric Diffusion
  Authors: Vitor Guizilini, Muhammad Zubair Irshad, Dian Chen, Greg Shakhnarovich, Rares Ambrus
  Year: 2025
  ArXiv: 2501.18804
  Project: https://mvgd.github.io/
  Tags: 360 degree, Diffusion, Feed-Forward, Point Cloud
  Key: Current methods for 3D scene reconstruction from sparse posed images employ intermediate 3D representations such as neural fields, voxel grids, or 3D Gaussians, to achieve multi-view consistent scene

- Title: CityLoc: 6 DoF Localization of Text Descriptions in Large-Scale Scenes with Gaussian Representation
  Authors: Qi Ma, Runyi Yang, Bin Ren, Ender Konukoglu, Luc Van Gool, Danda Pani Paudel
  Year: 2025
  ArXiv: 2501.08982
  Tags: Language Embedding
  Key: Localizing text descriptions in large-scale 3D scenes is inherently an ambiguous task. This nonetheless arises while describing general concepts, e.g. all traffic lights in a city.   To facilitate rea

- Title: GS-LIVO: Real-Time LiDAR, Inertial, and Visual Multi-sensor Fused Odometry with Gaussian Mapping
  Authors: Sheng Hong, Chunran Zheng, Yishu Shen, Changze Li, Fu Zhang, Tong Qin, Shaojie Shen
  Year: 2025
  ArXiv: 2501.08672
  Tags: Lidar
  Key: In recent years, 3D Gaussian splatting (3D-GS) has emerged as a novel scene representation approach. However, existing vision-only 3D-GS methods often rely on hand-crafted heuristics for point-cloud d

- Title: VINGS-Mono: Visual-Inertial Gaussian Splatting Monocular SLAM in Large Scenes
  Authors: Ke Wu, Zicheng Zhang, Muer Tie, Ziqing Ai, Zhongxue Gan, Wenchao Ding
  Year: 2025
  ArXiv: 2501.08286
  Tags: Meshing, SLAM
  Key: VINGS-Mono is a monocular (inertial) Gaussian Splatting (GS) SLAM framework designed for large scenes. The framework comprises four main components: VIO Front End, 2D Gaussian Map, NVS Loop Closure, a

- Title: CrossView-GS: Cross-view Gaussian Splatting For Large-scale Scene Reconstruction
  Authors: Chenhao Zhang, Yuanping Cao, Lei Zhang
  Year: 2025
  ArXiv: 2501.01695
  Tags: Optimization
  Key: 3D Gaussian Splatting (3DGS) has emerged as a prominent method for scene representation and reconstruction, leveraging densely distributed Gaussian primitives to enable real-time rendering of high-res

- Title: PG-SAG: Parallel Gaussian Splatting for Fine-Grained Large-Scale Urban Buildings Reconstruction via Semantic-Aware Grouping
  Authors: Tengfei Wang, Xin Wang, Yongmao Hou, Yiwei Xu, Wendi Zhang, Zongqian Zhan
  Year: 2025
  ArXiv: 2501.01677
  Tags: Meshing, Optimization
  Key: 3D Gaussian Splatting (3DGS) has emerged as a transformative method in the field of real-time novel synthesis. Based on 3DGS, recent advancements cope with large-scale scenes via spatial-based partiti

- Title: STORM: Spatio-Temporal Reconstruction Model for Large-Scale Outdoor Scenes
  Authors: Jiawei Yang, Jiahui Huang, Yuxiao Chen, Yan Wang, Boyi Li, Yurong You, Apoorva Sharma, Maximilian Igl, Peter Karkus, Danfei Xu, Boris Ivanovic, Yue Wang, Marco Pavone
  Year: 2024
  ArXiv: 2501.00602
  Tags: Autonomous Driving, Dynamic
  Key: We present STORM, a spatio-temporal reconstruction model designed for reconstructing dynamic outdoor scenes from sparse observations. Existing dynamic reconstruction methods often rely on per-scene op

- Title: 4D Gaussian Splatting: Modeling Dynamic Scenes with Native 4D Primitives
  Authors: Zeyu Yang, Zijie Pan, Xiatian Zhu, Li Zhang, Yu-Gang Jiang, Philip H. S. Torr
  Year: 2024
  ArXiv: 2412.20720
  Tags: Compression, Dynamic
  Key: Dynamic 3D scene representation and novel view synthesis from captured videos are crucial for enabling immersive experiences required by AR/VR and metaverse applications. However, this task is challen

- Title: CoSurfGS:Collaborative 3D Surface Gaussian Splatting with Distributed Learning for Large Scene Reconstruction
  Authors: Yuanyuan Gao, Yalun Dai, Hao Li, Weicai Ye, Junyi Chen, Danpeng Chen, Dingwen Zhang, Tong He, Guofeng Zhang, Junwei Han
  Year: 2024
  ArXiv: 2412.17612
  Project: https://gyy456.github.io/CoSurfGS/
  Tags: Distributed, Meshing
  Key: 3D Gaussian Splatting (3DGS) has demonstrated impressive performance in scene reconstruction. However, most existing GS-based surface reconstruction methods focus on 3D objects or limited scenes. Dire

- Title: Momentum-GS: Momentum Gaussian Self-Distillation for High-Quality Large Scene Reconstruction
  Authors: Jixuan Fan, Wanhua Li, Yifei Han, Yansong Tang
  Year: 2024
  ArXiv: 2412.04887
  Code: https://github.com/Jixuan-Fan/Momentum-GS
  Project: https://jixuan-fan.github.io/Momentum-GS_Page/
  Key: 3D Gaussian Splatting has demonstrated notable success in large-scale scene reconstruction, but challenges persist due to high training memory consumption and storage overhead. Hybrid representations

- Title: CityGaussianV2: Efficient and Geometrically Accurate Reconstruction for Large-Scale Scenes
  Authors: Yang Liu, Chuanchen Luo, Zhongkai Mao, Junran Peng, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2411.00771
  Code: https://github.com/DekuLiuTesla/CityGaussian
  Project: https://dekuliutesla.github.io/CityGaussianV2/
  Tags: Meshing
  Key: Recently, 3D Gaussian Splatting (3DGS) has revolutionized radiance field reconstruction, manifesting efficient and high-fidelity novel view synthesis. However, accurately representing surfaces, especi

- Title: On Scaling Up 3D Gaussian Splatting Training
  Authors: Hexu Zhao, Haoyang Weng, Daohan Lu, Ang Li, Jinyang Li, Aurojit Panda, Saining Xie
  Year: 2024
  ArXiv: 2406.18533
  Code: https://github.com/nyu-systems/Grendel-GS
  Project: https://daohanlu.github.io/scaling-up-3dgs/
  Tags: Distributed
  Key: 3D Gaussian Splatting (3DGS) is increasingly popular for 3D reconstruction due to its superior visual quality and rendering speed. However, 3DGS training currently occurs on a single GPU, limiting its

- Title: A Hierarchical 3D Gaussian Representation for Real-Time Rendering of Very Large Datasets
  Authors: Bernhard Kerbl, Andreas Meuleman, Georgios Kopanas, Michael Wimmer,  Alexandre Lanvin, George Drettakis
  Year: 2024
  ArXiv: 2406.12080
  Code: https://github.com/graphdeco-inria/hierarchical-3d-gaussians
  Project: https://repo-sam.inria.fr/fungraph/hierarchical-3d-gaussians/
  Key: Novel view synthesis has seen major advances in recent years, with 3D Gaussian splatting offering an excellent level of visual quality, fast training and real-time rendering. However, the resources ne

- Title: DOGS: Distributed-Oriented Gaussian Splatting for Large-Scale 3D Reconstruction Via Gaussian Consensus
  Authors: Yu Chen, Gim Hee Lee
  Year: 2024
  ArXiv: 2405.13943
  Code: https://github.com/AIBluefisher/DOGS
  Project: https://aibluefisher.github.io/DOGS/
  Key: The recent advances in 3D Gaussian Splatting (3DGS) show promising results on the novel view synthesis (NVS) task. With its superior rendering performance and high-fidelity rendering quality, 3DGS is

- Title: LetsGo: Large-Scale Garage Modeling and Rendering via LiDAR-Assisted Gaussian Primitives
  Authors: Jiadi Cui, Junming Cao, Fuqiang Zhao, Zhipeng He, Yifan Chen, Yuhui Zhong, Lan Xu, Yujiao Shi, Yingliang Zhang, Jingyi Yu
  Year: 2024
  ArXiv: 2404.09748
  Code: https://github.com/zhaofuq/LOD-3DGS
  Project: https://zhaofuq.github.io/LetsGo/
  Tags: Lidar
  Key: Large garages are ubiquitous yet intricate scenes that present unique challenges due to their monotonous colors, repetitive patterns, reflective surfaces, and transparent vehicle glass. Conventional S

- Title: CityGaussian: Real-time High-quality Large-Scale Scene Rendering with Gaussians
  Authors: Yang Liu, He Guan, Chuanchen Luo, Lue Fan, Naiyan Wang, Junran Peng, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2404.01133
  Code: https://github.com/DekuLiuTesla/CityGaussian
  Project: https://dekuliutesla.github.io/citygs/
  Key: The advancement of real-time 3D scene reconstruction and novel view synthesis has been significantly propelled by 3D Gaussian Splatting (3DGS). However, effectively training large-scale 3DGS and rende

- Title: HGS-Mapping: Online Dense Mapping Using Hybrid Gaussian Representation in Urban Scenes
  Authors: Ke Wu, Kaizhao Zhang, Zhiwei Zhang, Shanshuai Yuan, Muer Tie, Julong Wei, Zijun Xu, Jieru Zhao, Zhongxue Gan, Wenchao Ding
  Year: 2024
  ArXiv: 2403.20159
  Key: Online dense mapping of urban scenes forms a fundamental cornerstone for scene understanding and navigation of autonomous vehicles. Recent advancements in mapping methods are mainly based on NeRF, who

- Title: Octree-GS: Towards Consistent Real-time Rendering with LOD-Structured 3D Gaussians
  Authors: Kerui Ren, Lihan Jiang, Tao Lu, Mulin Yu, Linning Xu, Zhangkai Ni, Bo Dai
  Year: 2024
  ArXiv: 2403.17898
  Code: https://github.com/city-super/Octree-GS
  Project: https://city-super.github.io/octree-gs/
  Tags: Rendering
  Key: The recent 3D Gaussian splatting (3D-GS) has shown remarkable rendering fidelity and efficiency compared to NeRF-based neural scene representations. While demonstrating the potential for real-time ren

- Title: Fed3DGS: Scalable 3D Gaussian Splatting with Federated Learning
  Authors: Teppei Suzuki
  Year: 2024
  ArXiv: 2403.11460
  Code: https://github.com/DensoITLab/Fed3DGS
  Tags: Distributed
  Key: In this work, we present Fed3DGS, a scalable 3D reconstruction framework based on 3D Gaussian splatting (3DGS) with federated learning. Existing city-scale reconstruction methods typically adopt a cen

- Title: VastGaussian: Vast 3D Gaussians for Large Scene Reconstruction
  Authors: Jiaqi Lin, Zhihao Li, Xiao Tang, Jianzhuang Liu, Shiyong Liu, Jiayue Liu, Yangdi Lu, Xiaofei Wu, Songcen Xu, Youliang Yan, Wenming Yang
  Year: 2024
  ArXiv: 2402.17427
  Code: https://github.com/kangpeilun/VastGaussian
  Project: https://vastgaussian.github.io/
  Key: Existing NeRF-based methods for large scene reconstruction often have limitations in visual quality and rendering speed. While the recent 3D Gaussian Splatting works well on small-scale and object-cen

- Title: LIV-GaussMap: LiDAR-Inertial-Visual Fusion for Real-time 3D Radiance Field Map Rendering
  Authors: Sheng Hong, Junjie He, Xinhu Zheng, Hesheng Wang, Hao Fang, Kangcheng Liu, Chunran Zheng, Shaojie Shen
  Year: 2024
  ArXiv: 2401.14857
  Tags: Lidar
  Key: We introduce an integrated precise LiDAR, Inertial, and Visual (LIV) multi-modal sensor fused mapping system that builds on the differentiable surface splatting to improve the mapping fidelity, qualit

- Title: GauU-Scene: A Scene Reconstruction Benchmark on Large Scale 3D Reconstruction Dataset Using Gaussian Splatting
  Authors: Butian Xiong, Zhuo Li, Zhen Li
  Year: 2024
  ArXiv: 2401.14032
  Code: https://github.com/saliteta/lidar_SfM_alignment
  Project: https://saliteta.github.io/CUHKSZ_SMBU/
  Key: We introduce a novel large-scale scene reconstruction benchmark using the newly developed 3D representation approach, Gaussian Splatting, on our expansive U-Scene dataset. U-Scene encompasses over one

================================================================================
CATEGORY: Lidar (5 papers)
================================================================================

- Title: GS-LIVO: Real-Time LiDAR, Inertial, and Visual Multi-sensor Fused Odometry with Gaussian Mapping
  Authors: Sheng Hong, Chunran Zheng, Yishu Shen, Changze Li, Fu Zhang, Tong Qin, Shaojie Shen
  Year: 2025
  ArXiv: 2501.08672
  Tags: Large-Scale
  Key: In recent years, 3D Gaussian splatting (3D-GS) has emerged as a novel scene representation approach. However, existing vision-only 3D-GS methods often rely on hand-crafted heuristics for point-cloud d

- Title: LetsGo: Large-Scale Garage Modeling and Rendering via LiDAR-Assisted Gaussian Primitives
  Authors: Jiadi Cui, Junming Cao, Fuqiang Zhao, Zhipeng He, Yifan Chen, Yuhui Zhong, Lan Xu, Yujiao Shi, Yingliang Zhang, Jingyi Yu
  Year: 2024
  ArXiv: 2404.09748
  Code: https://github.com/zhaofuq/LOD-3DGS
  Project: https://zhaofuq.github.io/LetsGo/
  Tags: Large-Scale
  Key: Large garages are ubiquitous yet intricate scenes that present unique challenges due to their monotonous colors, repetitive patterns, reflective surfaces, and transparent vehicle glass. Conventional S

- Title: TCLC-GS: Tightly Coupled LiDAR-Camera Gaussian Splatting for Surrounding Autonomous Driving Scenes
  Authors: Cheng Zhao, Su Sun, Ruoyu Wang, Yuliang Guo, Jun-Jun Wan, Zhou Huang, Xinyu Huang, Yingjie Victor Chen, Liu Ren
  Year: 2024
  ArXiv: 2404.02410
  Tags: Autonomous Driving
  Key: Most 3D Gaussian Splatting (3D-GS) based methods for urban scenes initialize 3D Gaussians directly with 3D LiDAR points, which not only underutilizes LiDAR data capabilities but also overlooks the pot

- Title: SGD: Street View Synthesis with Gaussian Splatting and Diffusion Prior
  Authors: Zhongrui Yu, Haoran Wang, Jinze Yang, Hanzhang Wang, Zeke Xie, Yunfeng Cai, Jiale Cao, Zhong Ji, Mingming Sun
  Year: 2024
  ArXiv: 2403.20079
  Tags: Diffusion, Sparse
  Key: Novel View Synthesis (NVS) for street scenes play a critical role in the autonomous driving simulation. The current mainstream technique to achieve it is neural rendering, such as Neural Radiance Fiel

- Title: LIV-GaussMap: LiDAR-Inertial-Visual Fusion for Real-time 3D Radiance Field Map Rendering
  Authors: Sheng Hong, Junjie He, Xinhu Zheng, Hesheng Wang, Hao Fang, Kangcheng Liu, Chunran Zheng, Shaojie Shen
  Year: 2024
  ArXiv: 2401.14857
  Tags: Large-Scale
  Key: We introduce an integrated precise LiDAR, Inertial, and Visual (LIV) multi-modal sensor fused mapping system that builds on the differentiable surface splatting to improve the mapping fidelity, qualit

================================================================================
CATEGORY: LoD (2 papers)
================================================================================

- Title: GoDe: Gaussians on Demand for Progressive Level of Detail and Scalable Compression
  Authors: Francesco Di Sario, Riccardo Renzulli, Marco Grangetto, Akihiro Sugimoto, Enzo Tartaglione
  Year: 2025
  ArXiv: 2501.13558
  Tags: Compression
  Key: 3D Gaussian Splatting enhances real-time performance in novel view synthesis by representing scenes with mixtures of Gaussians and utilizing differentiable rasterization. However, it typically require

- Title: PRoGS: Progressive Rendering of Gaussian Splats
  Authors: Brent Zoomers, Maarten Wijnants, Ivan Molenaers, Joni Vanherck, Jeroen Put, Lode Jorissen, Nick Michiels
  Year: 2024
  ArXiv: 2409.01761
  Tags: Compression, Rendering
  Key: Over the past year, 3D Gaussian Splatting (3DGS) has received significant attention for its ability to represent 3D scenes in a perceptually accurate manner. However, it can require a substantial amou

================================================================================
CATEGORY: Medicine (7 papers)
================================================================================

- Title: Gaussian Pancakes: Geometrically-Regularized 3D Gaussian Splatting for Realistic Endoscopic Reconstruction
  Authors: Sierra Bonilla, Shuai Zhang, Dimitrios Psychogyios, Danail Stoyanov, Francisco Vasconcelos, Sophia Bano
  Year: 2024
  ArXiv: 2404.06128
  Code: https://github.com/smbonilla/GaussianPancakes
  Project: https://papers.miccai.org/miccai-2024/349-Paper2298.html
  Key: Within colorectal cancer diagnostics, conventional colonoscopy techniques face critical limitations, including a limited field of view and a lack of depth information, which can impede the detection o

- Title: GaSpCT: Gaussian Splatting for Novel CT Projection View Synthesis
  Authors: Emmanouil Nikolakakis, Utkarsh Gupta, Jonathan Vengosh, Justin Bui, Razvan Marinescu
  Year: 2024
  ArXiv: 2404.03126
  Key: We present GaSpCT, a novel view synthesis and 3D scene representation method used to generate novel projection views for Computer Tomography (CT) scans. We adapt the Gaussian Splatting framework to en

- Title: TOGS: Gaussian Splatting with Temporal Opacity Offset for Real-Time 4D DSA Rendering
  Authors: Shuai Zhang, Huangxuan Zhao, Zhenghong Zhou, Guanjun Wu, Chuansheng Zheng, Xinggang Wang, Wenyu Liu
  Year: 2024
  ArXiv: 2403.19586
  Code: https://github.com/hustvl/TOGS
  Key: Four-dimensional Digital Subtraction Angiography (4D DSA) is a medical imaging technique that provides a series of 2D images captured at different stages and angles during the process of contrast agen

- Title: EndoGSLAM: Real-Time Dense Reconstruction and Tracking in Endoscopic Surgeries using Gaussian Splatting
  Authors: Kailing Wang, Chen Yang, Yuehao Wang, Sikuang Li, Yan Wang, Qi Dou, Xiaokang Yang, Wei Shen
  Year: 2024
  ArXiv: 2403.15124
  Code: https://github.com/endogslam/EndoGSLAM
  Project: https://endogslam.loping151.com/
  Tags: SLAM
  Key: Precise camera tracking, high-fidelity 3D tissue reconstruction, and real-time online visualization are critical for intrabody medical imaging devices such as endoscopes and capsule robots. However, e

- Title: Radiative Gaussian Splatting for Efficient X-ray Novel View Synthesis
  Authors: TYuanhao Cai, Yixun Liang, Jiahao Wang, Angtian Wang, Yulun Zhang, Xiaokang Yang, Zongwei Zhou, Alan Yuille
  Year: 2024
  ArXiv: 2403.04116
  Key: X-ray is widely applied for transmission imaging due to its stronger penetration than natural light. When rendering novel view X-ray projections, existing methods mainly based on NeRF suffer from long

- Title: Endo-4DGS: Endoscopic Monocular Scene Reconstruction with 4D Gaussian Splatting
  Authors: Yiming Huang, Beilei Cui, Long Bai, Ziqi Guo, Mengya Xu, Mobarakol Islam, Hongliang Ren
  Year: 2024
  ArXiv: 2401.16416
  Tags: Dynamic
  Key: In the realm of robot-assisted minimally invasive surgery, dynamic scene reconstruction can significantly enhance downstream tasks and improve surgical outcomes. Neural Radiance Fields (NeRF)-based me

- Title: EndoGS: Deformable Endoscopic Tissues Reconstruction with Gaussian Splatting
  Authors: Lingting Zhu, Zhao Wang, Jiahao Cui, Zhenchao Jin, Guying Lin, Lequan Yu
  Year: 2024
  ArXiv: 2401.11535
  Code: https://github.com/HKU-MedAI/EndoGS
  Key: Surgical 3D reconstruction is a critical area of research in robotic surgery, with recent works adopting variants of dynamic radiance fields to achieve success in 3D reconstruction of deformable tissu

================================================================================
CATEGORY: Meshing (37 papers)
================================================================================

- Title: MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian Splatting
  Authors: Hanzhi Chang, Ruijie Zhu, Wenjie Chang, Mulin Yu, Yanzhe Liang, Jiahao Lu, Zhuoyuan Li, Tianzhu Zhang
  Year: 2025
  ArXiv: 2508.17811
  Project: https://hanzhichang.github.io/meshsplat_web/
  Tags: 2DGS, Feed-Forward
  Key: Surface reconstruction has been widely studied in computer vision and graphics. However, existing surface reconstruction works struggle to recover accurate scene geometry when the input views are extr

- Title: Car-GS: Addressing Reflective and Transparent Surface Challenges in 3D Car Reconstruction
  Authors: Congcong Li, Jin Wang, Xiaomeng Wang, Xingchen Zhou, Wei Wu, Yuzhi Zhang, Tongyi Cao
  Year: 2025
  ArXiv: 2501.11020
  Tags: Rendering
  Key: 3D car modeling is crucial for applications in autonomous driving systems, virtual and augmented reality, and gaming. However, due to the distinctive properties of cars, such as highly reflective and

- Title: GSTAR: Gaussian Surface Tracking and Reconstruction
  Authors: Chengwei Zheng, Lixin Xue, Juan Zarate, Jie Song
  Year: 2025
  ArXiv: 2501.10283
  Project: chengwei-zheng.github.io/GSTAR/
  Tags: Avatar, Dynamic
  Key: 3D Gaussian Splatting techniques have enabled efficient photo-realistic rendering of static scenes. Recent works have extended these approaches to support surface reconstruction and tracking. However,

- Title: VINGS-Mono: Visual-Inertial Gaussian Splatting Monocular SLAM in Large Scenes
  Authors: Ke Wu, Zicheng Zhang, Muer Tie, Ziqing Ai, Zhongxue Gan, Wenchao Ding
  Year: 2025
  ArXiv: 2501.08286
  Tags: Large-Scale, SLAM
  Key: VINGS-Mono is a monocular (inertial) Gaussian Splatting (GS) SLAM framework designed for large scenes. The framework comprises four main components: VIO Front End, 2D Gaussian Map, NVS Loop Closure, a

- Title: RMAvatar: Photorealistic Human Avatar Reconstruction from Monocular Video Based on Rectified Mesh-embedded Gaussians
  Authors: Sen Peng, Weixing Xie, Zilong Wang, Xiaohu Guo, Zhonggui Chen, Baorong Yang, Xiao Dong
  Year: 2025
  ArXiv: 2501.07104
  Code: https://github.com/RMAvatar/RMAvatar
  Project: https://rm-avatar.github.io/
  Tags: Avatar, Dynamic, Monocular
  Key: We introduce RMAvatar, a novel human avatar representation with Gaussian splatting embedded on mesh to learn clothed avatar from a monocular video. We utilize the explicit mesh geometry to represent m

- Title: FatesGS: Fast and Accurate Sparse-View Surface Reconstruction using Gaussian Splatting with Depth-Feature Consistency
  Authors: Han Huang, Yulun Wu, Chao Deng, Ge Gao, Ming Gu, Yu-Shen Liu
  Year: 2025
  ArXiv: 2501.04628
  Project: https://alvin528.github.io/FatesGS/
  Tags: Sparse
  Key: Recently, Gaussian Splatting has sparked a new trend in the field of computer vision. Apart from novel view synthesis, it has also been extended to the area of multi-view reconstruction. The latest me

- Title: Cloth-Splatting: 3D Cloth State Estimation from RGB Supervision
  Authors: Alberta Longhini, Marcel Büsching, Bardienus Pieter Duisterhof, Jens Lundell, Jeffrey Ichnowski, Mårten Björkman, Danica Kragic
  Year: 2024
  ArXiv: 2501.01715
  Code: https://github.com/KTH-RPL/cloth-splatting
  Project: https://kth-rpl.github.io/cloth-splatting/
  Tags: Rendering
  Key: Recently, 3D Gaussian Splatting (3DGS) has revolutionized radiance field reconstruction, manifesting efficient and high-fidelity novel view synthesis. However, accurately We introduce Cloth-Splatting,

- Title: PG-SAG: Parallel Gaussian Splatting for Fine-Grained Large-Scale Urban Buildings Reconstruction via Semantic-Aware Grouping
  Authors: Tengfei Wang, Xin Wang, Yongmao Hou, Yiwei Xu, Wendi Zhang, Zongqian Zhan
  Year: 2025
  ArXiv: 2501.01677
  Tags: Large-Scale, Optimization
  Key: 3D Gaussian Splatting (3DGS) has emerged as a transformative method in the field of real-time novel synthesis. Based on 3DGS, recent advancements cope with large-scale scenes via spatial-based partiti

- Title: Reflective Gaussian Splatting
  Authors: Yuxuan Yao, Zixuan Zeng, Chun Gu, Xiatian Zhu, Li Zhang
  Year: 2024
  ArXiv: 2412.19282
  Project: https://fudan-zvg.github.io/ref-gaussian/
  Tags: Ray Tracing, Relight
  Key: Novel view synthesis has experienced significant advancements owing to increasingly capable NeRF- and 3DGS-based methods. However, reflective object reconstruction remains challenging, lacking a prope

- Title: ActiveGS: Active Scene Reconstruction using Gaussian Splatting
  Authors: Liren Jin, Xingguang Zhong, Yue Pan, Jens Behley, Cyrill Stachniss, Marija Popović
  Year: 2024
  ArXiv: 2412.17769
  Tags: Robotics, SLAM
  Key: Robotics applications often rely on scene reconstructions to enable downstream tasks. In this work, we tackle the challenge of actively building an accurate map of an unknown scene using an on-board R

- Title: CoSurfGS:Collaborative 3D Surface Gaussian Splatting with Distributed Learning for Large Scene Reconstruction
  Authors: Yuanyuan Gao, Yalun Dai, Hao Li, Weicai Ye, Junyi Chen, Danpeng Chen, Dingwen Zhang, Tong He, Guofeng Zhang, Junwei Han
  Year: 2024
  ArXiv: 2412.17612
  Project: https://gyy456.github.io/CoSurfGS/
  Tags: Distributed, Large-Scale
  Key: 3D Gaussian Splatting (3DGS) has demonstrated impressive performance in scene reconstruction. However, most existing GS-based surface reconstruction methods focus on 3D objects or limited scenes. Dire

- Title: SolidGS: Consolidating Gaussian Surfel Splatting for Sparse-View Surface Reconstruction
  Authors: Zhuowen Shen, Yuan Liu, Zhang Chen, Zhong Li, Jiepeng Wang, Yongqing Liang, Zhengming Yu, Jingdong Zhang, Yi Xu, Scott Schaefer, Xin Li, Wenping Wang
  Year: 2024
  ArXiv: 2412.15400
  Project: https://mickshen7558.github.io/projects/SolidGS/
  Tags: Sparse
  Key: Gaussian splatting has achieved impressive improvements for both novel-view synthesis and surface reconstruction from multi-view images. However, current methods still struggle to reconstruct high-qua

- Title: MAtCha Gaussians: Atlas of Charts for High-Quality Geometry and Photorealism From Sparse Views
  Authors: Antoine Guédon, Tomoki Ichikawa, Kohei Yamashita, Ko Nishino
  Year: 2024
  ArXiv: 2412.06767
  Project: https://anttwo.github.io/matcha/
  Tags: Sparse
  Key: We present a novel appearance model that simultaneously realizes explicit high-quality 3D surface mesh recovery and photorealistic novel view synthesis from sparse view samples. Our key idea is to mod

- Title: HDGS: Textured 2D Gaussian Splatting for Enhanced Scene Rendering
  Authors: Yunzhou Song, Heguang Lin, Jiahui Lei, Lingjie Liu, Kostas Daniilidis
  Year: 2024
  ArXiv: 2412.01823
  Tags: 2DGS, Antialiasing
  Key: Recent advancements in neural rendering, particularly 2D Gaussian Splatting (2DGS), have shown promising results for jointly reconstructing fine appearance and geometry by leveraging 2D Gaussian surfe

- Title: GausSurf: Geometry-Guided 3D Gaussian Splatting for Surface Reconstruction
  Authors: Jiepeng Wang, Yuan Liu, Peng Wang, Cheng Lin, Junhui Hou, Xin Li, Taku Komura, Wenping Wang
  Year: 2024
  ArXiv: 2411.19454
  Project: https://jiepengwang.github.io/GausSurf/
  Key: 3D Gaussian Splatting has achieved impressive performance in novel view synthesis with real-time rendering capabilities. However, reconstructing high-quality surfaces with fine details using 3D Gaussi

- Title: AGS-Mesh: Adaptive Gaussian Splatting and Meshing with Geometric Priors for Indoor Room Reconstruction Using Smartphones
  Authors: Xuqian Ren, Matias Turkulainen, Jiepeng Wang, Otto Seiskari, Iaroslav Melekhov, Juho Kannala, Esa Rahtu
  Year: 2024
  ArXiv: 2411.19271
  Code: https://github.com/XuqianRen/AGS_Mesh
  Project: https://xuqianren.github.io/ags_mesh_website/
  Key: Geometric priors are often used to enhance 3D reconstruction. With many smartphones featuring low-resolution depth sensors and the prevalence of off-the-shelf monocular geometry estimators, incorporat

- Title: Quadratic Gaussian Splatting for Efficient and Detailed Surface Reconstruction
  Authors: Ziyu Zhang, Binbin Huang, Hanqing Jiang, Liyang Zhou, Xiaojun Xiang, Shunhan Shen
  Year: 2024
  ArXiv: 2411.16392
  Code: https://github.com/QuadraticGS/QGS
  Project: https://quadraticgs.github.io/QGS/
  Key: Recently, 3D Gaussian Splatting (3DGS) has attracted attention for its superior rendering quality and speed over Neural Radiance Fields (NeRF). To address 3DGS's limitations in surface representation,

- Title: SplatSDF: Boosting Neural Implicit SDF via Gaussian Splatting Fusion
  Authors: Runfa Blark Li, Keito Suzuki, Bang Du, Ki Myung Brian Lee, Nikolay Atanasov, Truong Nguyen
  Year: 2024
  ArXiv: 2411.15468
  Project: https://blarklee.github.io/splatsdf/
  Key: A signed distance function (SDF) is a useful representation for continuous-space geometry and many related operations, including rendering, collision checking, and mesh generation. Hence, reconstructi

- Title: CityGaussianV2: Efficient and Geometrically Accurate Reconstruction for Large-Scale Scenes
  Authors: Yang Liu, Chuanchen Luo, Zhongkai Mao, Junran Peng, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2411.00771
  Code: https://github.com/DekuLiuTesla/CityGaussian
  Project: https://dekuliutesla.github.io/CityGaussianV2/
  Tags: Large-Scale
  Key: Recently, 3D Gaussian Splatting (3DGS) has revolutionized radiance field reconstruction, manifesting efficient and high-fidelity novel view synthesis. However, accurately representing surfaces, especi

- Title: PSHuman: Photorealistic Single-view Human Reconstruction using Cross-Scale Diffusion
  Authors: Peng Li, Wangguandong Zheng, Yuan Liu, Tao Yu, Yangguang Li, Xingqun Qi, Mengfei Li, Xiaowei Chi, Siyu Xia, Wei Xue, Wenhan Luo, Qifeng Liu, Yike Guo
  Year: 2024
  ArXiv: 2409.10141
  Code: https://github.com/pengHTYX/PSHuman
  Project: https://penghtyx.github.io/PSHuman/
  Tags: Avatar, Diffusion
  Key: Detailed and photorealistic 3D human modeling is essential for various applications and has seen tremendous progress. However, full-body reconstruction from a monocular RGB image remains challenging d

- Title: GS-Octree: Octree-based 3D Gaussian Splatting for Robust Object-level 3D Reconstruction Under Strong Lighting
  Authors: Jiaze Li, Zhengyu Wen, Luo Zhang, Jiangbei Hu, Fei Hou, Zhebin Zhang, Ying He
  Year: 2024
  ArXiv: 2406.18199
  Key: The 3D Gaussian Splatting technique has significantly advanced the construction of radiance fields from multi-view images, enabling real-time rendering. While point-based rasterization effectively red

- Title: Effective Rank Analysis and Regularization for Enhanced 3D Gaussian Splatting
  Authors: Junha Hyung, Susung Hong, Sungwon Hwang, Jaeseong Lee, Jaegul Choo, Jin-Hwa Kim
  Year: 2024
  ArXiv: 2406.11672
  Project: https://junhahyung.github.io/erankgs.github.io/
  Tags: Densification
  Key: 3D reconstruction from multi-view images is one of the fundamental challenges in computer vision and graphics. Recently, 3D Gaussian Splatting (3DGS) has emerged as a promising technique capable of re

- Title:  RaDe-GS: Rasterizing Depth in Gaussian Splatting 
  Authors: Baowen Zhang, Chuan Fang, Rakesh Shrestha, Yixun Liang, Xiaoxiao Long, Ping Tan
  Year: 2024
  ArXiv: 2406.01467
  Code: https://github.com/BaowenZ/RaDe-GS
  Project: https://baowenz.github.io/radegs/
  Key: Gaussian Splatting (GS) has proven to be highly effective in novel view synthesis, achieving high-quality and real-time rendering. However, its potential for reconstructing detailed 3D shapes has not

- Title: PhyRecon: Physically Plausible Neural Scene Reconstruction
  Authors: Junfeng Ni, Yixin Chen, Bohan Jing, Nan Jiang, Bin Wang, Bo Dai, Puhao Li, Yixin Zhu, Song-Chun Zhu, Siyuan Huang
  Year: 2024
  ArXiv: 2404.16666
  Code: https://github.com/PhyRecon/PhyRecon
  Project: https://phyrecon.github.io/
  Tags: Dynamic, Physics
  Key: We address the issue of physical implausibility in multi-view neural reconstruction. While implicit representations have gained popularity in multi-view 3D reconstruction, previous work struggles to y

- Title: GS2Mesh: Surface Reconstruction from Gaussian Splatting via Novel Stereo Views
  Authors: Yaniv Wolf, Amit Bracha, Ron Kimmel
  Year: 2024
  ArXiv: 2404.01810
  Code: https://github.com/yanivw12/gs2mesh
  Project: https://gs2mesh.github.io//
  Tags: 2DGS, Stereo
  Key: Recently, 3D Gaussian Splatting (3DGS) has emerged as an efficient approach for accurately representing scenes. However, despite its superior novel view synthesis capabilities, extracting the geometry

- Title: 3DGSR: Implicit Surface Reconstruction with 3D Gaussian Splatting
  Authors: Mauro Comi, Alessio Tonioni, Max Yang, Jonathan Tremblay, Valts Blukis, Yijiong Lin, Nathan F. Lepora, Laurence Aitchison
  Year: 2024
  ArXiv: 2404.00409
  Tags: Rendering
  Key: In this paper, we present an implicit surface reconstruction method with 3D Gaussian Splatting (3DGS), namely 3DGSR, that allows for accurate 3D reconstruction with intricate details while inheriting

- Title: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
  Authors: Binbin Huang, Zehao Yu, Anpei Chen, Andreas Geiger, Shenghua Gao
  Year: 2024
  ArXiv: 2403.17888
  Code: https://github.com/hbb1/2d-gaussian-splatting
  Project: https://surfsplatting.github.io/
  Tags: 2DGS
  Key: 3D Gaussian Splatting (3DGS) has recently revolutionized radiance field reconstruction, achieving high quality novel view synthesis and fast rendering speed without baking. However, 3DGS fails to accu

- Title: DN-Splatter: Depth and Normal Priors for Gaussian Splatting and Meshing
  Authors: Matias Turkulainen, Xuqian Ren, Iaroslav Melekhov, Otto Seiskari, Esa Rahtu, Juho Kannala
  Year: 2024
  ArXiv: 2403.17822
  Code: https://github.com/maturk/dn-splatter
  Project: https://maturk.github.io/dn-splatter/
  Key: 3D Gaussian splatting, a novel differentiable rendering technique, has achieved state-of-the-art novel view synthesis results with high rendering speeds and relatively low training times. However, its

- Title: GSDF: 3DGS Meets SDF for Improved Rendering and Reconstruction
  Authors: Mulin Yu, Tao Lu, Linning Xu, Lihan Jiang, Yuanbo Xiangli, Bo Dai
  Year: 2024
  ArXiv: 2403.16964
  Code: https://github.com/city-super/GSDF
  Project: https://city-super.github.io/GSDF/
  Tags: Rendering
  Key: Presenting a 3D scene from multiview images remains a core and long-standing challenge in computer vision and computer graphics. Two main requirements lie in rendering and reconstruction. Notably, SOT

- Title: Gaussian Frosting: Editable Complex Radiance Fields with Real-Time Rendering
  Authors: Antoine Guédon, Vincent Lepetit
  Year: 2024
  ArXiv: 2403.14554
  Code: https://github.com/Anttwo/Frosting
  Project: https://anttwo.github.io/frosting/
  Tags: Dynamic, Editing
  Key: We propose Gaussian Frosting, a novel mesh-based representation for high-quality rendering and editing of complex 3D effects in real-time. Our approach builds on the recent 3D Gaussian Splatting frame

- Title: Bridging 3D Gaussian and Mesh for Freeview Video Rendering
  Authors: Yuting Xiao, Xuan Wang, Jiafei Li, Hongrui Cai, Yanbo Fan, Nan Xue, Minghui Yang, Yujun Shen, Shenghua Gao
  Year: 2024
  ArXiv: 2403.11453
  Tags: Avatar, Dynamic
  Key: This is only a preview version of GauMesh. Recently, primitive-based rendering has been proven to achieve convincing results in solving the problem of modeling and rendering the 3D dynamic scene from

- Title: Mesh-based Gaussian Splatting for Real-time Large-scale Deformation
  Authors: Lin Gao, Jie Yang, Bo-Tao Zhang, Jia-Mu Sun, Yu-Jie Yuan, Hongbo Fu, Yu-Kun Lai
  Year: 2024
  ArXiv: 2402.04796
  Tags: Dynamic
  Key: Neural implicit representations, including Neural Distance Fields and Neural Radiance Fields, have demonstrated significant capabilities for reconstructing surfaces with complicated geometry and topol

- Title: GaMeS: Mesh-Based Adapting and Modification of Gaussian Splatting
  Authors: Joanna Waczyńska, Piotr Borycki, Sławomir Tadeja, Jacek Tabor, Przemysław Spurek
  Year: 2024
  ArXiv: 2402.01459
  Code: https://github.com/waczjoan/gaussian-mesh-splatting
  Tags: Dynamic
  Key: In recent years, a range of neural network-based methods for image rendering have been introduced. For instance, widely-researched neural radiance fields (NeRF) rely on a neural network to represent 3

- Title: VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality
  Authors: Ying Jiang, Chang Yu, Tianyi Xie, Xuan Li, Yutao Feng, Huamin Wang, Minchen Li, Henry Lau, Feng Gao, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2401.16663
  Project: https://yingjiang96.github.io/VR-GS/
  Tags: Physics, Virtual Reality
  Key: As consumer Virtual Reality (VR) and Mixed Reality (MR) technologies gain momentum, there's a growing focus on the development of engagements with 3D virtual content. Unfortunately, traditional techni

- Title: GAvatar: Animatable 3D Gaussian Avatars with Implicit Mesh Learning
  Authors: Ye Yuan, Xueting Li, Yangyi Huang, Shalini De Mello, Koki Nagano, Jan Kautz, Umar Iqbal
  Year: 2023
  ArXiv: 2312.11461
  Project: https://nvlabs.github.io/GAvatar/
  Tags: Avatar
  Key: Gaussian splatting has emerged as a powerful 3D representation that harnesses the advantages of both explicit (mesh) and implicit (NeRF) 3D representations. In this paper, we seek to leverage Gaussian

- Title: NeuSG: Neural Implicit Surface Reconstruction with 3D Gaussian Splatting Guidance
  Authors: Hanlin Chen, Chen Li, Gim Hee Lee
  Year: 2023
  ArXiv: 2312.00846
  Key: Existing neural implicit surface reconstruction methods have achieved impressive performance in multi-view 3D reconstruction by leveraging explicit geometry priors such as depth maps or point clouds a

- Title: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Mesh Rendering
  Authors: Antoine Guédon, Vincent Lepetit
  Year: 2023
  ArXiv: 2311.12775
  Code: https://github.com/Anttwo/SuGaR
  Project: https://imagine.enpc.fr/~guedona/sugar/
  Key: We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting. Gaussian Splatting has recently become very popular as it yields realistic rendering while being sig

================================================================================
CATEGORY: Misc (17 papers)
================================================================================

- Title: Radiance Fields for Robotic Teleoperation
  Authors: Maximum Wilder-Smith, Vaishakh Patil, Marco Hutter
  Year: 2024
  ArXiv: 2407.20194
  Code: https://github.com/leggedrobotics/radiance_field_ros
  Project: https://leggedrobotics.github.io/rffr.github.io/
  Tags: Robotics
  Key: Radiance field methods such as Neural Radiance Fields (NeRFs) or 3D Gaussian Splatting (3DGS), have revolutionized graphics and novel view synthesis. Their ability to synthesize new viewpoints with ph

- Title: SplatPose & Detect: Pose-Agnostic 3D Anomaly Detection
  Authors: Mathis Kruse, Marco Rudolph, Dominik Woiwode, Bodo Rosenhahn
  Year: 2024
  ArXiv: 2404.06832
  Code: https://github.com/m-kruse98/SplatPose
  Tags: Poses
  Key: Detecting anomalies in images has become a well-explored problem in both academia and industry. State-of-the-art algorithms are able to detect defects in increasingly difficult settings and data modal

- Title: SpikeNVS: Enhancing Novel View Synthesis from Blurry Images via Spike Camera
  Authors: Gaole Dai, Zhenyu Wang, Qinwen Xu, Ming Lu, Wen Chen, Boxin Shi, Shanghang Zhang, Tiejun Huang
  Year: 2024
  ArXiv: 2404.06710
  Tags: Deblurring
  Key: One of the most critical factors in achieving sharp Novel View Synthesis (NVS) using neural field methods like Neural Radiance Fields (NeRF) and 3D Gaussian Splatting (3DGS) is the quality of the trai

- Title: Dual-Camera Smooth Zoom on Mobile Phones
  Authors: Renlong Wu, Zhilu Zhang, Yu Yang, Wangmeng Zuo
  Year: 2024
  ArXiv: 2404.04908
  Code: https://github.com/ZcsrenlongZ/ZoomGS
  Project: https://dualcamerasmoothzoom.github.io/
  Tags: Rendering
  Key: When zooming between dual cameras on a mobile, noticeable jumps in geometric content and image color occur in the preview, inevitably affecting the user's zoom experience. In this work, we introduce a

- Title: HO-Gaussian: Hybrid Optimization of 3D Gaussian Splatting for Urban Scenes
  Authors: Zhuopeng Li, Yilin Zhang, Chenming Wu, Jianke Zhu, Liangjun Zhang
  Year: 2024
  ArXiv: 2403.20032
  Tags: Densification
  Key: The rapid growth of 3D Gaussian Splatting (3DGS) has revolutionized neural rendering, enabling real-time production of high-quality renderings. However, the previous 3DGS-based methods have limitation

- Title: RadSplat: Radiance Field-Informed Gaussian Splatting for Robust Real-Time Rendering with 900+ FPS
  Authors: Michael Niemeyer, Fabian Manhardt, Marie-Julie Rakotosaona, Michael Oechsle, Daniel Duckworth, Rama Gosula, Keisuke Tateno, John Bates, Dominik Kaeser, Federico Tombari
  Year: 2024
  ArXiv: 2403.13806
  Project: https://m-niemeyer.github.io/radsplat/
  Tags: Densification, Rendering
  Key: Recent advances in view synthesis and real-time rendering have achieved photorealistic quality at impressive rendering speeds. While Radiance Field-based methods achieve state-of-the-art quality in ch

- Title: Reinforcement Learning with Generalizable Gaussian Splatting
  Authors: Jiaxu Wang, Qiang Zhang, Jingkai Sun, Jiahang Cao, Yecheng Shao, Renjing Xu
  Year: 2024
  ArXiv: 2404.07950
  Tags: Robotics
  Key: An excellent representation is crucial for reinforcement learning (RL) performance, especially in vision-based reinforcement learning tasks. The quality of the environment representation directly infl

- Title: 3DGS-Calib: 3D Gaussian Splatting for Multimodal SpatioTemporal Calibration
  Authors: Quentin Herau, Moussab Bennehar, Arthur Moreau, Nathan Piasco, Luis Roldao, Dzmitry Tsishkou, Cyrille Migniot, Pascal Vasseur, Cédric Demonceaux
  Year: 2024
  ArXiv: 2403.11577
  Project: https://qherau.github.io/3DGS-Calib/
  Key: Reliable multimodal sensor fusion algorithms re- quire accurate spatiotemporal calibration. Recently, targetless calibration techniques based on implicit neural representations have proven to provide

- Title: Creating Seamless 3D Maps Using Radiance Fields
  Authors: Sai Tarun Sathyan, Thomas B. Kinsman
  Year: 2024
  ArXiv: 2403.11364
  Key: It is desirable to create 3D object models and 3D maps from 2D input images for applications such as navigation, virtual tourism, and urban planning. The traditional methods of creating 3D maps, (such

- Title: DarkGS: Learning Neural Illumination and 3D Gaussians Relighting for Robotic Exploration in the Dark
  Authors: Tianyi Zhang, Kaining Huang, Weiming Zhi, Matthew Johnson-Roberson
  Year: 2024
  ArXiv: 2403.10814
  Code: https://github.com/tyz1030/darkgs
  Tags: Robotics
  Key: Humans have the remarkable ability to construct consistent mental models of an environment, even under limited or varying levels of illumination. We wish to endow robots with this same capability. In

- Title: Next Best Sense: Guiding Vision and Touch with FisherRF for 3D Gaussian Splatting
  Authors: Matthew Strong, Boshu Lei, Aiden Swann, Wen Jiang, Kostas Daniilidis, Monroe Kennedy III
  Year: 2024
  ArXiv: 2401.16663
  Code: https://github.com/armlabstanford/NextBestSense
  Project: https://armlabstanford.github.io/next-best-sense
  Tags: Robotics
  Key: We propose a framework for active next best view and touch selection for robotic manipulators using 3D Gaussian Splatting (3DGS). 3DGS is emerging as a useful explicit 3D scene representation for robo

- Title: PEGASUS: Physically Enhanced Gaussian Splatting Simulation System for 6DOF Object Pose Dataset Generation
  Authors: Lukas Meyer, Floris Erich, Yusuke Yoshiyasu, Marc Stamminger, Noriaki Ando, Yukiyasu Domae
  Year: 2023
  ArXiv: 2401.02281
  Code: https://github.com/meyerls/PEGASUS
  Project: https://meyerls.github.io/pegasus_web/
  Key: Modeling dynamic, large-scale urban scenes is challenging due to their highly intricate geometric structures and unconstrained dynamics in both space and time. Prior methods often employ high-level ar

- Title: Triplane Meets Gaussian Splatting: Fast and Generalizable Single-View 3D Reconstruction with Transformers
  Authors: Zi-Xin Zou, Zhipeng Yu, Yuan-Chen Guo, Yangguang Li, Ding Liang, Yan-Pei Cao, Song-Hai Zhang
  Year: 2023
  ArXiv: 2312.09147
  Code: https://github.com/VAST-AI-Research/TriplaneGaussian
  Project: https://zouzx.github.io/TriplaneGaussian/
  Tags: Transformer
  Key: Recent advancements in 3D reconstruction from single images have been driven by the evolution of generative models. Prominent among these are methods based on Score Distillation Sampling (SDS) and the

- Title: MANUS: Markerless Hand-Object Grasp Capture using Articulated 3D Gaussians
  Authors: Chandradeep Pokhariya, Ishaan N Shah, Angela Xing, Zekun Li, Kefan Chen, Avinash Sharma, Srinath Sridhar
  Year: 2023
  ArXiv: 2312.02137
  Code: https://github.com/brown-ivl/manus
  Project: https://ivl.cs.brown.edu/research/manus.html
  Key: Understanding how we grasp objects with our hands has important applications in areas like robotics and mixed reality. However, this challenging problem requires accurate modeling of the contact betwe

- Title: Mathematical Supplement for the gsplat Library
  Authors: Vickie Ye, Angjoo Kanazawa
  Year: 2023
  ArXiv: 2312.02121
  Key: This report provides the mathematical details of the gsplat library, a modular toolbox for efficient differentiable Gaussian splatting, as proposed by Kerbl et al. It provides a self-contained referen

- Title: Periodic Vibration Gaussian: Dynamic Urban Scene Reconstruction and Real-time Rendering
  Authors: Yurui Chen, Chun Gu, Junzhe Jiang, Xiatian Zhu, Li Zhang
  Year: 2023
  ArXiv: 2311.18561
  Code: https://github.com/fudan-zvg/PVG
  Project: https://fudan-zvg.github.io/PVG/
  Tags: Autonomous Driving
  Key: Modeling dynamic, large-scale urban scenes is challenging due to their highly intricate geometric structures and unconstrained dynamics in both space and time. Prior methods often employ high-level ar

- Title: FisherRF: Active View Selection and Uncertainty Quantification for Radiance Fields using Fisher Information
  Authors: Wen Jiang, Boshu Lei, Kostas Daniilidis
  Year: 2023
  ArXiv: 2311.17874
  Code: https://github.com/JiangWenPL/FisherRF
  Project: https://jiangwenpl.github.io/FisherRF/
  Tags: Uncertainty
  Key: This study addresses the challenging problem of active view selection and uncertainty quantification within the domain of Radiance Fields. Neural Radiance Fields (NeRF) have greatly advanced image ren

================================================================================
CATEGORY: Monocular (13 papers)
================================================================================

- Title: RMAvatar: Photorealistic Human Avatar Reconstruction from Monocular Video Based on Rectified Mesh-embedded Gaussians
  Authors: Sen Peng, Weixing Xie, Zilong Wang, Xiaohu Guo, Zhonggui Chen, Baorong Yang, Xiao Dong
  Year: 2025
  ArXiv: 2501.07104
  Code: https://github.com/RMAvatar/RMAvatar
  Project: https://rm-avatar.github.io/
  Tags: Avatar, Dynamic, Meshing
  Key: We introduce RMAvatar, a novel human avatar representation with Gaussian splatting embedded on mesh to learn clothed avatar from a monocular video. We utilize the explicit mesh geometry to represent m

- Title: F3D-Gaus: Feed-forward 3D-aware Generation on ImageNet with Cycle-Consistent Gaussian Splatting
  Authors: Yuxin Wang, Qianyi Wu, Dan Xu
  Year: 2025
  ArXiv: 2501.06714
  Code: https://github.com/W-Ted/F3D-Gaus
  Project: https://arxiv.org/abs/2501.06714
  Tags: Feed-Forward
  Key: This paper tackles the problem of generalizable 3D-aware generation from monocular datasets, e.g., ImageNet. The key challenge of this task is learning a robust 3D-aware representation without multi-v

- Title: SplineGS: Robust Motion-Adaptive Spline for Real-Time Dynamic 3D Gaussians from Monocular Video
  Authors: Jongmin Park, Minh-Quan Viet Bui, Juan Luis Gonzalez Bello, Jaeho Moon, Jihyong Oh, Munchurl Kim
  Year: 2024
  ArXiv: 2412.09982
  Code: https://github.com/KAIST-VICLab/SplineGS
  Project: https://kaist-viclab.github.io/splinegs-site/
  Tags: Dynamic
  Key: Synthesizing novel views from in-the-wild monocular videos is challenging due to scene dynamics and the lack of multi-view cues. To address this, we propose SplineGS, a COLMAP-free dynamic 3D Gaussian

- Title: Feed-Forward Bullet-Time Reconstruction of Dynamic Scenes from Monocular Videos
  Authors: Hanxue Liang, Jiawei Ren, Ashkan Mirzaei, Antonio Torralba, Ziwei Liu, Igor Gilitschenski, Sanja Fidler, Cengiz Oztireli, Huan Ling, Zan Gojcic, Jiahui Huang
  Year: 2024
  ArXiv: 2412.03526
  Tags: Dynamic, Feed-Forward
  Key: Recent advancements in static feed-forward scene reconstruction have demonstrated significant progress in high-quality novel view synthesis. However, these models often struggle with generalizability

- Title: FATE: Full-head Gaussian Avatar with Textural Editing from Monocular Video
  Authors: Jiawei Zhang, Zijian Wu, Zhiyang Liang, Yicheng Gong, Dongfang Hu, Yao Yao, Xun Cao, Hao Zhu
  Year: 2024
  ArXiv: 2411.15604
  Code: https://github.com/zjwfufu/FateAvatar
  Project: https://zjwfufu.github.io/FATE-page/
  Tags: Avatar, Dynamic, Editing, Texturing
  Key: Reconstructing high-fidelity, animatable 3D head avatars from effortlessly captured monocular videos is a pivotal yet formidable challenge. Although significant progress has been made in rendering per

- Title: DynOMo: Online Point Tracking by Dynamic Online Monocular Gaussian Reconstruction
  Authors: Jenny Seidenschwarz, Qunjie Zhou, Bardienus Duisterhof, Deva Ramanan, Laura Leal-Taixé
  Year: 2024
  ArXiv: 2409.02104
  Tags: Dynamic
  Key: Reconstructing scenes and tracking motion are two sides of the same coin. Tracking points allow for geometric reconstruction [14], while geometric reconstruction of (dynamic) scenes allows for 3D trac

- Title: Dynamic Gaussian Marbles for Novel View Synthesis of Casual Monocular Videos
  Authors: Colton Stearns, Adam Harley, Mikaela Uy, Florian Dubost, Federico Tombari, Gordon Wetzstein, Leonidas Guibas
  Year: 2024
  ArXiv: 2406.18717
  Code: https://github.com/coltonstearns/dynamic-gaussian-marbles
  Project: https://geometry.stanford.edu/projects/dynamic-gaussian-marbles.github.io/
  Tags: Dynamic
  Key: Gaussian splatting has become a popular representation for novel-view synthesis, exhibiting clear strengths in efficiency, photometric quality, and compositional edibility. Following its success, many

- Title: MoDGS: Dynamic Gaussian Splatting from Causually-captured Monocular Videos
  Authors: Qingming Liu*, Yuan Liu*, Jiepeng Wang, Xianqiang Lv,Peng Wang, Wenping Wang, Junhui Hou†,
  Year: 2024
  ArXiv: 2406.00434
  Project: https://modgs.github.io/
  Tags: Dynamic
  Key: In this paper, we propose MoDGS, a new pipeline to render novel-view images in dynamic scenes using only casually captured monocular videos. Previous monocular dynamic NeRF or Gaussian Splatting metho

- Title: DreamScene4D: Dynamic Multi-Object Scene Generation from Monocular Videos
  Authors: Wen-Hsuan Chu, Lei Ke, Katerina Fragkiadaki
  Year: 2024
  ArXiv: 2405.02280
  Code: https://github.com/dreamscene4d/dreamscene4d
  Project: https://dreamscene4d.github.io/
  Tags: Dynamic
  Key: Existing VLMs can track in-the-wild 2D video objects while current generative models provide powerful visual priors for synthesizing novel views for the highly under-constrained 2D-to-3D object liftin

- Title: GoMAvatar: Efficient Animatable Human Modeling from Monocular Video Using Gaussians-on-Mesh
  Authors: Jing Wen, Xiaoming Zhao, Zhongzheng Ren, Alexander G. Schwing, Shenlong Wang
  Year: 2024
  ArXiv: 2404.07991
  Code: https://github.com/wenj/GoMAvatar
  Project: https://wenj.github.io/GoMAvatar/
  Tags: Avatar
  Key: We introduce GoMAvatar, a novel approach for real-time, memory-efficient, high-quality animatable human modeling. GoMAvatar takes as input a single monocular video to create a digital avatar capable o

- Title: BAGS: Building Animatable Gaussian Splatting from a Monocular Video with Diffusion Priors
  Authors: Tingyang Zhang, Qingzhe Gao, Weiyu Li, Libin Liu, Baoquan Chen
  Year: 2024
  ArXiv: 2403.11427
  Code: https://github.com/Michaelszj/bags
  Tags: Diffusion, Dynamic
  Key: Animatable 3D reconstruction has significant applications across various fields, primarily relying on artists' handcraft creation. Recently, some studies have successfully constructed animatable 3D mo

- Title: MonoGaussianAvatar: Monocular Gaussian Point-based Head Avatar
  Authors: Yufan Chen, Lizhen Wang, Qijing Li, Hongjiang Xiao, Shengping Zhang, Hongxun Yao, Yebin Liu
  Year: 2023
  ArXiv: 2312.04558
  Code: https://github.com/yufan1012/MonoGaussianAvatar
  Project: https://yufan1012.github.io/MonoGaussianAvatar
  Tags: Avatar
  Key: The ability to animate photo-realistic head avatars reconstructed from monocular portrait video sequences represents a crucial step in bridging the gap between the virtual and real worlds. Recent adva

- Title: Neural Parametric Gaussians for Monocular Non-Rigid Object Reconstruction
  Authors: Devikalyan Das, Christopher Wewer, Raza Yunus, Eddy Ilg, Jan Eric Lenssen
  Year: 2023
  ArXiv: 2312.01196
  Code: https://github.com/DevikalyanDas/npgs
  Project: https://geometric-rl.mpi-inf.mpg.de/npg/
  Tags: Dynamic
  Key: Reconstructing dynamic objects from monocular videos is a severely underconstrained and challenging problem, and recent work has approached it in various directions. However, owing to the ill-posed na

================================================================================
CATEGORY: Object Detection (1 papers)
================================================================================

- Title: 3DGS-DET: Empower 3D Gaussian Splatting with Boundary Guidance and Box-Focused Sampling for 3D Object Detection
  Authors: Yang Cao, Yuanliang Jv, Dan Xu
  Year: 2024
  ArXiv: 2410.01647
  Key: Neural Radiance Fields (NeRF) are widely used for novel-view synthesis and have been adapted for 3D Object Detection (3DOD), offering a promising approach to 3D object detection through view-synthesis

================================================================================
CATEGORY: Optimization (8 papers)
================================================================================

- Title: FOCI: Trajectory Optimization on Gaussian Splats
  Authors: Mario Gomez Andreu, Maximum Wilder-Smith, Victor Klemm, Vaishakh Patil, Jesus Tordesillas, Marco Hutter
  Year: 2025
  ArXiv: 2505.08510
  Tags: Robotics
  Key: 3D Gaussian Splatting (3DGS) has recently gained popularity as a faster alternative to Neural Radiance Fields (NeRFs) in 3D reconstruction and view synthesis methods. Leveraging the spatial informatio

- Title: 3DGS$^2$: Near Second-order Converging 3D Gaussian Splatting
  Authors: Lei Lan, Tianjia Shao, Zixuan Lu, Yu Zhang, Chenfanfu Jiang, Yin Yang
  Year: 2025
  ArXiv: 2501.13975
  Key: 3D Gaussian Splatting (3DGS) has emerged as a mainstream solution for novel view synthesis and 3D reconstruction. By explicitly encoding a 3D scene using a collection of Gaussian kernels, 3DGS achieve

- Title: CrossView-GS: Cross-view Gaussian Splatting For Large-scale Scene Reconstruction
  Authors: Chenhao Zhang, Yuanping Cao, Lei Zhang
  Year: 2025
  ArXiv: 2501.01695
  Tags: Large-Scale
  Key: 3D Gaussian Splatting (3DGS) has emerged as a prominent method for scene representation and reconstruction, leveraging densely distributed Gaussian primitives to enable real-time rendering of high-res

- Title: PG-SAG: Parallel Gaussian Splatting for Fine-Grained Large-Scale Urban Buildings Reconstruction via Semantic-Aware Grouping
  Authors: Tengfei Wang, Xin Wang, Yongmao Hou, Yiwei Xu, Wendi Zhang, Zongqian Zhan
  Year: 2025
  ArXiv: 2501.01677
  Tags: Large-Scale, Meshing
  Key: 3D Gaussian Splatting (3DGS) has emerged as a transformative method in the field of real-time novel synthesis. Based on 3DGS, recent advancements cope with large-scale scenes via spatial-based partiti

- Title: Deformable Radial Kernel Splatting
  Authors: Yi-Hua Huang, Ming-Xian Lin, Yang-Tian Sun, Ziyi Yang, Xiaoyang Lyu, Yan-Pei Cao, Xiaojuan Qi
  Year: 2024
  ArXiv: 2412.11752
  Project: https://yihua7.github.io/DRK-web/
  Tags: Rendering
  Key: Recently, Gaussian splatting has emerged as a robust technique for representing 3D scenes, enabling real-time rasterization and high-fidelity rendering. However, Gaussians' inherent radial symmetry an

- Title: Faster and Better 3D Splatting via Group Training
  Authors: Chengbo Wang, Guozheng Ma, Yifei Xue, Yizhen Lao
  Year: 2024
  Code: https://github.com/Chengbo-Wang/3DGS-with-Group-Training
  Project: https://chengbo-wang.github.io/3DGS-with-Group-Training/
  Paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Wang_Faster_and_Better_3D_Splatting_via_Group_Training_ICCV_2025_paper.pdf
  Tags: Acceleration, Densification
  Key: 3D Gaussian Splatting (3DGS) has emerged as a powerful technique for novel view synthesis, demonstrating remarkable capability in high-fidelity scene reconstruction through its Gaussian primitive repr

- Title: 4D Gaussian Splatting with Scale-aware Residual Field and Adaptive Optimization for Real-time Rendering of Temporally Complex Dynamic Scenes
  Authors: Jinbo Yan, Rui Peng, Luyang Tang, Ronggang Wang
  Year: 2024
  ArXiv: 2412.06299
  Code: https://github.com/yjb6/SaRO-GS
  Project: https://yjb6.github.io/SaRO-GS.github.io/
  Tags: Densification, Dynamic
  Key: Reconstructing dynamic scenes from video sequences is a highly promising task in the multimedia domain. While previous methods have made progress, they often struggle with slow rendering and managing

- Title: BillBoard Splatting (BBSplat): Learnable Textured Primitives for Novel View Synthesis
  Authors: David Svitov, Pietro Morerio, Lourdes Agapito, Alessio Del Bue
  Year: 2024
  ArXiv: 2411.08508
  Code: https://github.com/david-svitov/BBSplat
  Project: https://david-svitov.github.io/BBSplat_project_page/
  Tags: Texturing
  Key: We present billboard Splatting (BBSplat) - a novel approach for 3D scene representation based on textured geometric primitives. BBSplat represents the scene as a set of optimizable textured planar pri

================================================================================
CATEGORY: Perspective-correct (5 papers)
================================================================================

- Title: 3DGUT: Enabling Distorted Cameras and Secondary Rays in Gaussian Splatting
  Authors: Qi Wu, Janick Martinez Esturo, Ashkan Mirzaei, Nicolas Moenne-Loccoz, Zan Gojcic
  Year: 2024
  ArXiv: 2412.12507
  Project: https://research.nvidia.com/labs/toronto-ai/3DGUT/
  Key: 3D Gaussian Splatting (3DGS) has shown great potential for efficient reconstruction and high-fidelity real-time rendering of complex scenes on consumer hardware. However, due to its rasterization-base

- Title: Efficient Perspective-Correct 3D Gaussian Splatting Using Hybrid Transparency
  Authors: Florian Hahlbohm, Fabian Friederichs, Tim Weyrich, Linus Franke, Moritz Kappel, Susana Castillo, Marc Stamminger, Martin Eisemann, Marcus Magnor
  Year: 2024
  ArXiv: 2410.08129
  Project: https://fhahlbohm.github.io/htgs/
  Key: 3D Gaussian Splats (3DGS) have proven a versatile rendering primitive, both for inverse rendering as well as real-time exploration of scenes. In these applications, coherence across camera frames and

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Ray Tracing, Relight, Rendering, 360 degree, Antialiasing
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: On the Error Analysis of 3D Gaussian Splatting
and an Optimal Projection Strategy

  Authors: Letian Huang, Jiayang Bai, Jie Guo, Yanwen Guo
  Year: 2024
  ArXiv: 2402.00752
  Code: https://github.com/LetianHuang/op43dgs
  Project: https://letianhuang.github.io/op43dgs/
  Tags: Rendering
  Key: 3D Gaussian Splatting has garnered extensive attention and application in real-time neural rendering. Concurrently, concerns have been raised about the limitations of this technology in aspects such a

- Title: StopThePop: Sorted Gaussian Splatting for View-Consistent Real-time Rendering
  Authors: Lukas Radl, Michael Steiner, Mathias Parger, Alexander Weinrauch, Bernhard Kerbl, Markus Steinberger
  Year: 2024
  ArXiv: 2402.00525
  Code: https://github.com/r4dl/StopThePop
  Project: https://r4dl.github.io/StopThePop/
  Tags: Rendering
  Key: Gaussian Splatting has emerged as a prominent model for constructing 3D representations from images across diverse domains. However, the efficiency of the 3D Gaussian Splatting rendering pipeline reli

================================================================================
CATEGORY: Physics (10 papers)
================================================================================

- Title: OmniPhysGS: 3D Constitutive Gaussians for General Physics-Based Dynamics Generation
  Authors: Yuchen Lin, Chenguo Lin, Jianjin Xu, Yadong Mu
  Year: 2025
  ArXiv: 2501.18982
  Code: https://github.com/wgsxm/omniphysgs
  Project: https://wgsxm.github.io/projects/omniphysgs/
  Tags: Dynamic
  Key: Recently, significant advancements have been made in the reconstruction and generation of 3D assets, including static cases and those with physical interactions. To recover the physical properties of

- Title: GauSim: Registering Elastic Objects into Digital World by Gaussian Simulator
  Authors: Yidi Shao, Mu Huang, Chen Change Loy, Bo Dai
  Year: 2024
  ArXiv: 2412.17804
  Project: https://www.mmlab-ntu.com/project/gausim/index.html
  Tags: Dynamic
  Key: In this work, we introduce GauSim, a novel neural network-based simulator designed to capture the dynamic behaviors of real-world elastic objects represented through Gaussian kernels. Unlike tradition

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Ray Tracing, Relight, Rendering, 360 degree, Antialiasing, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: PhyRecon: Physically Plausible Neural Scene Reconstruction
  Authors: Junfeng Ni, Yixin Chen, Bohan Jing, Nan Jiang, Bin Wang, Bo Dai, Puhao Li, Yixin Zhu, Song-Chun Zhu, Siyuan Huang
  Year: 2024
  ArXiv: 2404.16666
  Code: https://github.com/PhyRecon/PhyRecon
  Project: https://phyrecon.github.io/
  Tags: Dynamic, Meshing
  Key: We address the issue of physical implausibility in multi-view neural reconstruction. While implicit representations have gained popularity in multi-view 3D reconstruction, previous work struggles to y

- Title: LoopGaussian: Creating 3D Cinemagraph with Multi-view Images via Eulerian Motion Field
  Authors: Jiyang Li, Lechao Cheng, Zhangye Wang, Tingting Mu, Jingxuan He
  Year: 2024
  ArXiv: 2404.08966
  Code: https://github.com/Pokerlishao/LoopGaussian
  Project: https://pokerlishao.github.io/LoopGaussian/
  Tags: Rendering
  Key: Cinemagraph is a unique form of visual media that combines elements of still photography and subtle motion to create a captivating experience. However, the majority of videos generated by recent works

- Title: Feature Splatting: Language-Driven Physics-Based Scene Synthesis and Editing
  Authors: Ri-Zhao Qiu, Ge Yang, Weijia Zeng, Xiaolong Wang
  Year: 2024
  ArXiv: 2404.01223
  Code: https://github.com/vuer-ai/feature_splatting
  Project: https://feature-splatting.github.io/
  Tags: Editing, Language Embedding, Segmentation
  Key: Scene representations using 3D Gaussian primitives have produced excellent results in modeling the appearance of static and dynamic 3D scenes. Many graphics applications, however, demand the ability t

- Title: Reconstruction and Simulation of Elastic Objects with Spring-Mass 3D Gaussians
  Authors: Licheng Zhong, Hong-Xing Yu, Jiajun Wu, Yunzhu Li
  Year: 2024
  ArXiv: 2403.09434
  Code: https://github.com/Colmar-zlicheng/Spring-Gaus
  Project: https://zlicheng.com/spring_gaus/
  Tags: Dynamic
  Key: Reconstructing and simulating elastic objects from visual observations is crucial for applications in computer vision and robotics. Existing methods, such as 3D Gaussians, provide modeling for 3D appe

- Title: VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality
  Authors: Ying Jiang, Chang Yu, Tianyi Xie, Xuan Li, Yutao Feng, Huamin Wang, Minchen Li, Henry Lau, Feng Gao, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2401.16663
  Project: https://yingjiang96.github.io/VR-GS/
  Tags: Meshing, Virtual Reality
  Key: As consumer Virtual Reality (VR) and Mixed Reality (MR) technologies gain momentum, there's a growing focus on the development of engagements with 3D virtual content. Unfortunately, traditional techni

- Title: Gaussian Splashing: Dynamic Fluid Synthesis with Gaussian Splatting
  Authors: Yutao Feng, Xiang Feng, Yintong Shang, Ying Jiang, Chang Yu, Zeshun Zong, Tianjia Shao, Hongzhi Wu, Kun Zhou, Chenfanfu Jiang, Yin Yang
  Year: 2024
  ArXiv: 2401.15318
  Project: https://amysteriouscat.github.io/GaussianSplashing/
  Tags: Dynamic, Rendering
  Key: We demonstrate the feasibility of integrating physics-based animations of solids and fluids with 3D Gaussian Splatting (3DGS) to create novel effects in virtual scenes reconstructed using 3DGS. Levera

- Title: PhysGaussian: Physics-Integrated 3D Gaussians for Generative Dynamics
  Authors: Tianyi Xie, Zeshun Zong, Yuxin Qiu, Xuan Li, Yutao Feng, Yin Yang, Chenfanfu Jiang
  Year: 2023
  ArXiv: 2311.12198
  Code: https://github.com/XPandora/PhysGaussian
  Project: https://xpandora.github.io/PhysGaussian/
  Key: We introduce PhysGaussian, a new method that seamlessly integrates physically grounded Newtonian dynamics within 3D Gaussians to achieve high-quality novel motion synthesis. Employing a custom Materia

================================================================================
CATEGORY: Point Cloud (7 papers)
================================================================================

- Title: Learning Unified Representation of 3D Gaussian Splatting
  Authors: Yuelin Xin, Yuheng Liu, Xiaohui Xie, Xinke Li
  Year: 2025
  ArXiv: 2509.22917
  Code: https://github.com/cilix-ai/gs-embedding
  Project: https://cilix-ai.github.io/gs-embedding-page/
  Tags: Compression, Feed-Forward, Segmentation
  Key: A well-designed vectorized representation is crucial for the learning systems natively based on 3D Gaussian Splatting. While 3DGS enables efficient and explicit 3D reconstruction, its parameter-based

- Title: Zero-Shot Novel View and Depth Synthesis with Multi-View Geometric Diffusion
  Authors: Vitor Guizilini, Muhammad Zubair Irshad, Dian Chen, Greg Shakhnarovich, Rares Ambrus
  Year: 2025
  ArXiv: 2501.18804
  Project: https://mvgd.github.io/
  Tags: 360 degree, Diffusion, Feed-Forward, Large-Scale
  Key: Current methods for 3D scene reconstruction from sparse posed images employ intermediate 3D representations such as neural fields, voxel grids, or 3D Gaussians, to achieve multi-view consistent scene

- Title: Dense-SfM: Structure from Motion with Dense Consistent Matching
  Authors: JongMin Lee, Sungjoo Yoo
  Year: 2025
  ArXiv: 2501.14277
  Tags: Poses
  Key: We present Dense-SfM, a novel Structure from Motion (SfM) framework designed for dense and accurate 3D reconstruction from multi-view images. Sparse keypoint matching, which traditional SfM methods of

- Title: 3DGS-to-PC: Convert a 3D Gaussian Splatting Scene into a Dense Point Cloud or Mesh
  Authors: Lewis A G Stuart, Michael P Pound
  Year: 2025
  ArXiv: 2501.07478
  Code: https://github.com/Lewis-Stuart-11/3DGS-to-PC
  Key: 3D Gaussian Splatting (3DGS) excels at producing highly detailed 3D reconstructions, but these scenes often require specialised renderers for effective visualisation. In contrast, point clouds are a w

- Title: GSplatLoc: Ultra-Precise Camera Localization via 3D Gaussian Splatting
  Authors: Atticus J. Zeller
  Year: 2024
  ArXiv: 2412.20056
  Code: https://github.com/AtticusZeller/GsplatLoc
  Tags: In the Wild, Poses, Robotics, SLAM
  Key: We present GSplatLoc, a camera localization method that leverages the differentiable rendering capabilities of 3D Gaussian splatting for ultra-precise pose estimation. By formulating pose estimation a

- Title: RT-GS2: Real-Time Generalizable Semantic Segmentation for 3D Gaussian Representations of Radiance Fields
  Authors: Mihnea-Bogdan Jurca, Remco Royen, Ion Giosan, Adrian Munteanu
  Year: 2024
  ArXiv: 2405.18033
  Code: https://github.com/mbjurca/RT_GS2
  Project: https://mbjurca.github.io/rt-gs2/
  Tags: Segmentation, Transformer, Virtual Reality
  Key: Gaussian Splatting has revolutionized the world of novel view synthesis by achieving high rendering performance in real-time. Recently, studies have focused on enriching these 3D representations with

- Title: Zero-shot Point Cloud Completion Via 2D Priors
  Authors: Tianxin Huang, Zhiwen Yan, Yuyang Zhao, Gim Hee Lee
  Year: 2024
  ArXiv: 2404.06814
  Tags: Diffusion
  Key: 3D point cloud completion is designed to recover complete shapes from partially observed point clouds. Conventional completion methods typically depend on extensive point cloud data for training %, wi

================================================================================
CATEGORY: Poses (17 papers)
================================================================================

- Title: From Sparse to Dense: Camera Relocalization with Scene-Specific Detector from Feature Gaussian Splatting
  Authors: Zhiwei Huang, Hailin Yu, Yichun Shentu, Jin Yuan, Guofeng Zhang
  Year: 2025
  ArXiv: 2503.19358
  Code: https://github.com/zju3dv/STDLoc
  Project: https://zju3dv.github.io/STDLoc/
  Key: This paper presents a novel camera relocalization method, STDLoc, which leverages Feature Gaussian as scene representation. STDLoc is a full relocalization pipeline that can achieve accurate relocaliz

- Title: Dense-SfM: Structure from Motion with Dense Consistent Matching
  Authors: JongMin Lee, Sungjoo Yoo
  Year: 2025
  ArXiv: 2501.14277
  Tags: Point Cloud
  Key: We present Dense-SfM, a novel Structure from Motion (SfM) framework designed for dense and accurate 3D reconstruction from multi-view images. Sparse keypoint matching, which traditional SfM methods of

- Title: GSplatLoc: Ultra-Precise Camera Localization via 3D Gaussian Splatting
  Authors: Atticus J. Zeller
  Year: 2024
  ArXiv: 2412.20056
  Code: https://github.com/AtticusZeller/GsplatLoc
  Tags: In the Wild, Point Cloud, Robotics, SLAM
  Key: We present GSplatLoc, a camera localization method that leverages the differentiable rendering capabilities of 3D Gaussian splatting for ultra-precise pose estimation. By formulating pose estimation a

- Title: Dust to Tower: Coarse-to-Fine Photo-Realistic Scene Reconstruction from Sparse Uncalibrated Images
  Authors: Xudong Cai, Yongcai Wang, Zhaoxin Fan, Deng Haoran, Shuo Wang, Wanting Li, Deying Li, Lun Luo, Minhang Wang, Jintao Xu
  Year: 2024
  ArXiv: 2412.19518
  Tags: Inpainting, Sparse
  Key: Photo-realistic scene reconstruction from sparse-view, uncalibrated images is highly required in practice. Although some successes have been made, existing methods are either Sparse-View but require a

- Title: DynSUP: Dynamic Gaussian Splatting from An Unposed Image Pair
  Authors: Weihang Li, Weirong Chen, Shenhan Qian, Jiajie Chen, Daniel Cremers, Haoang Li
  Year: 2024
  ArXiv: 2412.00851
  Project: https://colin-de.github.io/DynSUP/
  Tags: Dynamic
  Key: Recent advances in 3D Gaussian Splatting have shown promising results. Existing methods typically assume static scenes and/or multiple images with prior poses. Dynamics, sparse views, and unknown pose

- Title: SelfSplat: Pose-Free and 3D Prior-Free Generalizable 3D Gaussian Splatting
  Authors: Gyeongjin Kang, Jisang Yoo, Jihyeon Park, Seungtae Nam, Hyeonsoo Im, Sangheon Shin, Sangpil Kim, Eunbyung Park
  Year: 2024
  ArXiv: 2411.17190
  Code: https://github.com/Gynjn/selfsplat
  Project: https://gynjn.github.io/selfsplat/
  Tags: Feed-Forward
  Key: We propose SelfSplat, a novel 3D Gaussian Splatting model designed to perform pose-free and 3D prior-free generalizable 3D reconstruction from unposed multi-view images. These settings are inherently

- Title: Generating 3D-Consistent Videos from Unposed Internet Photos
  Authors: Gene Chou, Kai Zhang, Sai Bi, Hao Tan, Zexiang Xu, Fujun Luan, Bharath Hariharan, Noah Snavely
  Year: 2024
  ArXiv: 2411.13549
  Project: https://genechou.com/kfcw/
  Tags: Feed-Forward, In the Wild, Transformer
  Key: We address the problem of generating videos from unposed internet photos. A handful of input images serve as keyframes, and our model interpolates between them to simulate a path moving between the ca

- Title: SPARS3R: Semantic Prior Alignment and Regularization for Sparse 3D Reconstruction
  Authors: Yutao Tang, Yuxiang Guo, Deming Li, Cheng Peng
  Year: 2024
  ArXiv: 2411.12592
  Tags: 3ster-based, Sparse
  Key: Recent efforts in Gaussian-Splat-based Novel View Synthesis can achieve photorealistic rendering; however, such capability is limited in sparse-view scenarios due to sparse initialization and over-fit

- Title: Large Spatial Model: End-to-end Unposed Images to Semantic 3D
  Authors: Zhiwen Fan, Jian Zhang, Wenyan Cong, Peihao Wang, Renjie Li, Kairun Wen, Shijie Zhou, Achuta Kadambi, Zhangyang Wang, Danfei Xu, Boris Ivanovic, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2410.18956
  Code: https://github.com/NVlabs/LSM
  Project: https://largespatialmodel.github.io/
  Tags: Feed-Forward, Segmentation
  Key: Reconstructing and understanding 3D structures from a limited number of images is a well-established problem in computer vision. Traditional methods usually break this task into multiple subtasks, eac

- Title: GSLoc: Efficient Camera Pose Refinement via 3D Gaussian Splatting
  Authors: Changkun Liu, Shuai Chen, Yash Bhalgat, Siyan Hu, Ming Cheng, Zirui Wang, Victor Adrian Prisacariu, Tristan Braud
  Year: 2024
  ArXiv: 2408.11085
  Project: https://gsloc.active.vision/
  Key: We leverage 3D Gaussian Splatting (3DGS) as a scene representation and propose a novel test-time camera pose refinement framework, GSLoc. This framework enhances the localization accuracy of state-of-

- Title: SplatPose & Detect: Pose-Agnostic 3D Anomaly Detection
  Authors: Mathis Kruse, Marco Rudolph, Dominik Woiwode, Bodo Rosenhahn
  Year: 2024
  ArXiv: 2404.06832
  Code: https://github.com/m-kruse98/SplatPose
  Tags: Misc
  Key: Detecting anomalies in images has become a well-explored problem in both academia and industry. State-of-the-art algorithms are able to detect defects in increasingly difficult settings and data modal

- Title: MM-Gaussian: 3D Gaussian-based Multi-modal Fusion for Localization and Reconstruction in Unbounded Scenes
  Authors: Chenyang Wu, Yifan Duan, Xinran Zhang, Yu Sheng, Jianmin Ji, Yanyong Zhang
  Year: 2024
  ArXiv: 2404.04026
  Key: Localization and mapping are critical tasks for various applications such as autonomous vehicles and robotics. The challenges posed by outdoor environments present particular complexities due to their

- Title: 3DGS-ReLoc: 3D Gaussian Splatting for Map Representation and Visual ReLocalization
  Authors: Peng Jiang, Gaurav Pandey, Srikanth Saripalli
  Year: 2024
  ArXiv: 2403.11367
  Key: This paper presents a novel system designed for 3D mapping and visual relocalization using 3D Gaussian Splatting. Our proposed method uses LiDAR and camera data to create accurate and visually plausib

- Title: GS-Pose: Cascaded Framework for Generalizable Segmentation-based 6D Object Pose Estimation
  Authors: Dingding Cai, Janne Heikkilä, Esa Rahtu
  Year: 2024
  ArXiv: 2403.10683
  Code: https://github.com/dingdingcai/GSPose
  Project: https://dingdingcai.github.io/gs-pose/
  Key: This paper introduces GS-Pose, an end-to-end framework for locating and estimating the 6D pose of objects. GS-Pose begins with a set of posed RGB images of a previously unseen object and builds three

- Title: GGRt: Towards Generalizable 3D Gaussians without Pose Priors in Real-Time
  Authors: Hao Li, Yuanyuan Gao, Dingwen Zhang, Chenming Wu, Yalun Dai, Chen Zhao, Haocheng Feng, Errui Ding, Jingdong Wang, Junwei Han
  Year: 2024
  ArXiv: 2403.10147
  Code: https://github.com/lifuguan/GGRt_official
  Project: https://3d-aigc.github.io/GGRt/
  Key: This paper presents GGRt, a novel approach to generalizable novel view synthesis that alleviates the need for real camera poses, complexity in processing high-resolution images, and lengthy optimizati

- Title: iComMa: Inverting 3D Gaussians Splatting for Camera Pose Estimation via Comparing and Matching
  Authors: Yuan Sun, Xuan Wang, Yunfan Zhang, Jie Zhang, Caigui Jiang, Yu Guo, Fei Wang
  Year: 2023
  ArXiv: 2312.09031
  Code: https://github.com/YuanSun-XJTU/iComMa
  Key: We present a method named iComMa to address the 6D pose estimation problem in computer vision. The conventional pose estimation methods typically rely on the target's CAD model or necessitate specific

- Title: COLMAP-Free 3D Gaussian Splatting
  Authors: Yang Fu, Sifei Liu, Amey Kulkarni, Jan Kautz, Alexei A. Efros, Xiaolong Wang
  Year: 2023
  ArXiv: 2312.07504
  Code: https://github.com/NVlabs/CF-3DGS
  Project: https://oasisyang.github.io/colmap-free-3dgs/
  Key: While neural rendering has led to impressive advances in scene reconstruction and novel view synthesis, it relies heavily on accurately pre-computed camera poses. To relax this constraint, multiple ef

================================================================================
CATEGORY: Ray Tracing (7 papers)
================================================================================

- Title: Reflective Gaussian Splatting
  Authors: Yuxuan Yao, Zixuan Zeng, Chun Gu, Xiatian Zhu, Li Zhang
  Year: 2024
  ArXiv: 2412.19282
  Project: https://fudan-zvg.github.io/ref-gaussian/
  Tags: Meshing, Relight
  Key: Novel view synthesis has experienced significant advancements owing to increasingly capable NeRF- and 3DGS-based methods. However, reflective object reconstruction remains challenging, lacking a prope

- Title: EnvGS: Modeling View-Dependent Appearance with Environment Gaussian
  Authors: Tao Xie, Xi Chen, Zhen Xu, Yiman Xie, Yudong Jin, Yujun Shen, Sida Peng, Hujun Bao, Xiaowei Zhou
  Year: 2024
  ArXiv: 2412.15215
  Project: https://zju3dv.github.io/envgs/
  Tags: Rendering
  Key: Reconstructing complex reflections in real-world scenes from 2D images is essential for achieving photorealistic novel view synthesis. Existing methods that utilize environment maps to model reflectio

- Title: GI-GS: Global Illumination Decomposition on Gaussian Splatting for Inverse Rendering
  Authors: Hongze Chen, Zehong Lin, Jun Zhang
  Year: 2024
  ArXiv: 2410.02619
  Code: https://github.com/stopaimme/GI-GS
  Project: https://stopaimme.github.io/GI-GS/
  Tags: Relight
  Key: We present GI-GS, a novel inverse rendering framework that leverages 3D Gaussian Splatting (3DGS) and deferred shading to achieve photo-realistic novel view synthesis and relighting. In inverse render

- Title: EVER: Exact Volumetric Ellipsoid Rendering for Real-time View Synthesis
  Authors: Alexander Mai, Peter Hedman, George Kopanas, Dor Verbin, David Futschik, Qiangeng Xu, Falko Kuester, Jonathan T. Barron, Yinda Zhang
  Year: 2024
  ArXiv: 2410.01804
  Code: https://github.com/half-potato/ever_training
  Project: https://half-potato.gitlab.io/posts/ever/
  Tags: Rendering
  Key: We present Exact Volumetric Ellipsoid Rendering (EVER), a method for real-time differentiable emission-only volume rendering. Unlike recent rasterization based approach by 3D Gaussian Splatting (3DGS)

- Title: 3D Gaussian Ray Tracing: Fast Tracing of Particle Scenes
  Authors: Nicolas Moenne-Loccoz, Ashkan Mirzaei, Or Perel, Riccardo de Lutio, Janick Martinez Esturo, Gavriel State, Sanja Fidler, Nicholas Sharp, Zan Gojcic
  Year: 2024
  ArXiv: 2407.07090
  Project: https://gaussiantracer.github.io/
  Key: Particle-based representations of radiance fields such as 3D Gaussian Splatting have found great success for reconstructing and re-rendering of complex scenes. Most existing methods render particles v

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Relight, Rendering, 360 degree, Antialiasing, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: Relightable 3D Gaussian: Real-time Point Cloud Relighting with BRDF Decomposition and Ray Tracing
  Authors: Jian Gao, Chun Gu, Youtian Lin, Hao Zhu, Xun Cao, Li Zhang, Yao Yao
  Year: 2023
  ArXiv: 2311.16043
  Code: https://github.com/NJU-3DV/Relightable3DGaussian
  Project: https://nju-3dv.github.io/projects/Relightable3DGaussian/
  Tags: Relight, Rendering
  Key: We present a novel differentiable point-based rendering framework for material and lighting decomposition from multi-view images, enabling editing, ray-tracing, and real-time relighting of the 3D poin

================================================================================
CATEGORY: Relight (12 papers)
================================================================================

- Title: Reflective Gaussian Splatting
  Authors: Yuxuan Yao, Zixuan Zeng, Chun Gu, Xiatian Zhu, Li Zhang
  Year: 2024
  ArXiv: 2412.19282
  Project: https://fudan-zvg.github.io/ref-gaussian/
  Tags: Meshing, Ray Tracing
  Key: Novel view synthesis has experienced significant advancements owing to increasingly capable NeRF- and 3DGS-based methods. However, reflective object reconstruction remains challenging, lacking a prope

- Title: ReCap: Better Gaussian Relighting with Cross-Environment Captures
  Authors: Jingzhi Li, Zongwei Wu, Eduard Zamfir, Radu Timofte
  Year: 2024
  ArXiv: 2412.07534
  Project: https://jingzhi.github.io/ReCap/
  Key: Accurate 3D objects relighting in diverse unseen environments is crucial for realistic virtual object placement. Due to the albedo-lighting ambiguity, existing methods often fall short in producing fa

- Title: GI-GS: Global Illumination Decomposition on Gaussian Splatting for Inverse Rendering
  Authors: Hongze Chen, Zehong Lin, Jun Zhang
  Year: 2024
  ArXiv: 2410.02619
  Code: https://github.com/stopaimme/GI-GS
  Project: https://stopaimme.github.io/GI-GS/
  Tags: Ray Tracing
  Key: We present GI-GS, a novel inverse rendering framework that leverages 3D Gaussian Splatting (3DGS) and deferred shading to achieve photo-realistic novel view synthesis and relighting. In inverse render

- Title: Subsurface Scattering for 3D Gaussian Splatting
  Authors: Jan-Niklas Dihlmann, Arjun Majumdar, Andreas Engelhardt, Raphael Braun, Hendrik P. A. Lensch
  Year: 2024
  ArXiv: 2408.12282
  Project: https://sss.jdihlmann.com/
  Tags: Rendering
  Key: 3D reconstruction and relighting of objects made from scattering materials present a significant challenge due to the complex light transport beneath the surface. 3D Gaussian Splatting introduced high

- Title: LumiGauss: Relightable Gaussian Splatting in the Wild
  Authors: Joanna Kaleta, Kacper Kania, Tomasz Trzcinski, Marek Kowalski
  Year: 2024
  ArXiv: 2408.04474
  Code: https://github.com/joaxkal/lumigauss
  Project: https://lumigauss.github.io/
  Tags: In the Wild
  Key: Decoupling lighting from geometry using unconstrained photo collections is notoriously challenging. Solving it would benefit many users as creating complex 3D assets takes days of manual labor. Many p

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Ray Tracing, Rendering, 360 degree, Antialiasing, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: Gaussian Shadow Casting for Neural Characters
  Authors: Luis Bolanos, Shih-Yang Su, Helge Rhodin
  Year: 2024
  ArXiv: 2401.06116
  Code: https://github.com/LuisBolanos17/GaussianShadowCasting
  Tags: Avatar, Rendering
  Key: Neural character models can now reconstruct detailed geometry and texture from video, but they lack explicit shadows and shading, leading to artifacts when generating novel views and poses or during r

- Title: GIR: 3D Gaussian Inverse Rendering for Relightable Scene Factorization
  Authors: Yahao Shi, Yanmin Wu, Chenming Wu, Xing Liu, Chen Zhao, Haocheng Feng, Jingtuo Liu, Liangjun Zhang, Jian Zhang, Bin Zhou, Errui Ding, Jingdong Wang
  Year: 2023
  ArXiv: 2312.05133
  Project: https://3dgir.github.io/
  Tags: Rendering
  Key: This paper presents GIR, a 3D Gaussian Inverse Rendering method for relightable scene factorization. Compared to existing methods leveraging discrete meshes or neural implicit fields for inverse rende

- Title: Relightable Gaussian Codec Avatars
  Authors: Shunsuke Saito, Gabriel Schwartz, Tomas Simon, Junxuan Li, Giljoo Nam
  Year: 2023
  ArXiv: 2312.03704
  Code: https://github.com/facebookresearch/goliath
  Project: https://shunsukesaito.github.io/rgca/
  Tags: Avatar
  Key: The fidelity of relighting is bounded by both geometry and appearance representations. For geometry, both mesh and volumetric approaches have difficulty modeling intricate structures like 3D hair geom

- Title: GaussianShader: 3D Gaussian Splatting with Shading Functions for Reflective Surfaces
  Authors: Yingwenqi Jiang, Jiadong Tu, Yuan Liu, Xifeng Gao, Xiaoxiao Long, Wenping Wang, Yuexin Ma
  Year: 2023
  ArXiv: 2311.17977
  Code: https://github.com/Asparagus15/GaussianShader
  Project: https://asparagus15.github.io/GaussianShader.github.io/
  Tags: Rendering
  Key: The advent of neural 3D Gaussians has recently brought about a revolution in the field of neural rendering, facilitating the generation of high-quality renderings at real-time speeds. However, the exp

- Title: Relightable 3D Gaussian: Real-time Point Cloud Relighting with BRDF Decomposition and Ray Tracing
  Authors: Jian Gao, Chun Gu, Youtian Lin, Hao Zhu, Xun Cao, Li Zhang, Yao Yao
  Year: 2023
  ArXiv: 2311.16043
  Code: https://github.com/NJU-3DV/Relightable3DGaussian
  Project: https://nju-3dv.github.io/projects/Relightable3DGaussian/
  Tags: Ray Tracing, Rendering
  Key: We present a novel differentiable point-based rendering framework for material and lighting decomposition from multi-view images, enabling editing, ray-tracing, and real-time relighting of the 3D poin

- Title: GS-IR: 3D Gaussian Splatting for Inverse Rendering
  Authors: Zhihao Liang, Qi Zhang, Ying Feng, Ying Shan, Kui Jia
  Year: 2023
  ArXiv: 2311.16473
  Code: https://github.com/lzhnb/GS-IR
  Project: https://github.com/lzhnb/GS-IR
  Tags: Rendering
  Key: We propose GS-IR, a novel inverse rendering approach based on 3D Gaussian Splatting (GS) that leverages forward mapping volume rendering to achieve photorealistic novel view synthesis and relighting r

================================================================================
CATEGORY: Rendering (69 papers)
================================================================================

- Title: DARB-Splatting: Generalizing Splatting with Decaying Anisotropic Radial Basis Functions
  Authors: Vishagar Arunan, Saeedha Nazar, Hashiru Pramuditha, Vinasirajan Viruthshaan, Sameera Ramasinghe, Simon Lucey, Ranga Rodrigo
  Year: 2025
  ArXiv: 2501.12369
  Project: https://randomnerds.github.io/darbs.github.io/
  Key: Splatting-based 3D reconstruction methods have gained popularity with the advent of 3D Gaussian Splatting, efficiently synthesizing high-quality novel views. These methods commonly resort to using exp

- Title: Car-GS: Addressing Reflective and Transparent Surface Challenges in 3D Car Reconstruction
  Authors: Congcong Li, Jin Wang, Xiaomeng Wang, Xingchen Zhou, Wei Wu, Yuzhi Zhang, Tongyi Cao
  Year: 2025
  ArXiv: 2501.11020
  Tags: Meshing
  Key: 3D car modeling is crucial for applications in autonomous driving systems, virtual and augmented reality, and gaming. However, due to the distinctive properties of cars, such as highly reflective and

- Title: DehazeGS: Seeing Through Fog with 3D Gaussian Splatting
  Authors: Jinze Yu, Yiqun Wang, Zhengda Lu, Jianwei Guo, Yong Li, Hongxing Qin, Xiaopeng Zhang
  Year: 2025
  ArXiv: 2501.03659
  Tags: In the Wild
  Key: Current novel view synthesis tasks primarily rely on high-quality and clear images. However, in foggy scenes, scattering and attenuation can significantly degrade the reconstruction and rendering qual

- Title: Cloth-Splatting: 3D Cloth State Estimation from RGB Supervision
  Authors: Alberta Longhini, Marcel Büsching, Bardienus Pieter Duisterhof, Jens Lundell, Jeffrey Ichnowski, Mårten Björkman, Danica Kragic
  Year: 2024
  ArXiv: 2501.01715
  Code: https://github.com/KTH-RPL/cloth-splatting
  Project: https://kth-rpl.github.io/cloth-splatting/
  Tags: Meshing
  Key: Recently, 3D Gaussian Splatting (3DGS) has revolutionized radiance field reconstruction, manifesting efficient and high-fidelity novel view synthesis. However, accurately We introduce Cloth-Splatting,

- Title: EasySplat: View-Adaptive Learning makes 3D Gaussian Splatting Easy
  Authors: Ao Gao, Luosong Guo, Tao Chen, Zhao Wang, Ying Tai, Jian Yang, Zhenyu Zhang
  Year: 2025
  ArXiv: 2501.01003
  Tags: 3ster-based, Acceleration, Densification
  Key: 3D Gaussian Splatting (3DGS) techniques have achieved satisfactory 3D scene representation. Despite their impressive performance, they confront challenges due to the limitation of structure-from-motio

- Title: EnvGS: Modeling View-Dependent Appearance with Environment Gaussian
  Authors: Tao Xie, Xi Chen, Zhen Xu, Yiman Xie, Yudong Jin, Yujun Shen, Sida Peng, Hujun Bao, Xiaowei Zhou
  Year: 2024
  ArXiv: 2412.15215
  Project: https://zju3dv.github.io/envgs/
  Tags: Ray Tracing
  Key: Reconstructing complex reflections in real-world scenes from 2D images is essential for achieving photorealistic novel view synthesis. Existing methods that utilize environment maps to model reflectio

- Title: Deformable Radial Kernel Splatting
  Authors: Yi-Hua Huang, Ming-Xian Lin, Yang-Tian Sun, Ziyi Yang, Xiaoyang Lyu, Yan-Pei Cao, Xiaojuan Qi
  Year: 2024
  ArXiv: 2412.11752
  Project: https://yihua7.github.io/DRK-web/
  Tags: Optimization
  Key: Recently, Gaussian splatting has emerged as a robust technique for representing 3D scenes, enabling real-time rasterization and high-fidelity rendering. However, Gaussians' inherent radial symmetry an

- Title: Feat2GS: Probing Visual Foundation Models with Gaussian Splatting
  Authors: Yue Chen, Xingyu Chen, Anpei Chen, Gerard Pons-Moll, Yuliang Xiu
  Year: 2024
  ArXiv: 2412.09606
  Project: https://fanegg.github.io/Feat2GS/
  Tags: World Generation
  Key: Given that visual foundation models (VFMs) are trained on extensive datasets but often limited to 2D images, a natural question arises: how well do they understand the 3D world? With the differences i

- Title: Sparse Voxels Rasterization: Real-time High-fidelity Radiance Field Rendering
  Authors: Cheng Sun, Jaesung Choe, Charles Loop, Wei-Chiu Ma, Yu-Chiang Frank Wang
  Year: 2024
  ArXiv: 2412.04459
  Code: https://github.com/NVlabs/svraster
  Project: https://svraster.github.io/
  Tags: Sparse
  Key: We propose an efficient radiance field rendering algorithm that incorporates a rasterization process on sparse voxels without neural networks or 3D Gaussians. There are two key contributions coupled w

- Title: PlanarSplatting: Accurate Planar Surface Reconstruction in 3 Minutes
  Authors: Bin Tan, Rui Yu, Yujun Shen, Nan Xue
  Year: 2024
  ArXiv: 2412.03451
  Project: https://icetttb.github.io/PlanarSplatting/
  Tags: Acceleration
  Key: This paper presents PlanarSplatting, an ultra-fast and accurate surface reconstruction approach for multiview indoor images. We take the 3D planes as the main objective due to their compactness and st

- Title: T-3DGS: Removing Transient Objects for 3D Scene Reconstruction
  Authors: Vadim Pryadilshchikov, Alexander Markin, Artem Komarichev, Ruslan Rakhimov, Peter Wonka, Evgeny Burnaev
  Year: 2024
  ArXiv: 2412.00155
  Code: https://github.com/Vadim200116/T-3DGS
  Project: https://transient-3dgs.github.io/
  Key: We propose a novel framework to remove transient objects from input videos for 3D scene reconstruction using Gaussian Splatting. Our framework consists of the following steps. In the first step, we pr

- Title: SuperGaussians: Enhancing Gaussian Splatting Using Primitives with Spatially Varying Colors
  Authors: Rui Xu, Wenyue Chen, Jiepeng Wang, Yuan Liu, Peng Wang, Lin Gao, Shiqing Xin, Taku Komura, Xin Li, Wenping Wang
  Year: 2024
  ArXiv: 2411.18966
  Code: https://github.com/Xrvitd/SuperGaussians
  Project: https://ruixu.me/html/SuperGaussians/index.html
  Key: Gaussian Splattings demonstrate impressive results in multi-view reconstruction based on Gaussian explicit representations. However, the current Gaussian primitives only have a single view-dependent c

- Title: Textured Gaussians for Enhanced 3D Scene Appearance Modeling
  Authors: Brian Chao, Hung-Yu Tseng, Lorenzo Porzi, Chen Gao, Tuotuo Li, Qinbo Li, Ayush Saraf, Jia-Bin Huang, Johannes Kopf, Gordon Wetzstein, Changil Kim
  Year: 2024
  ArXiv: 2411.18625
  Project: https://textured-gaussians.github.io/
  Tags: In the Wild, Texturing
  Key: 3D Gaussian Splatting (3DGS) has recently emerged as a state-of-the-art 3D reconstruction and rendering technique due to its high-quality results and fast training and rendering time. However, pixels

- Title: Quark: Real-time, High-resolution, and General Neural View Synthesis
  Authors: John Flynn, Michael Broxton, Lukas Murmann, Lucy Chai, Matthew DuVall, Clément Godard, Kathryn Heal, Srinivas Kaza, Stephen Lombardi, Xuan Luo, Supreeth Achar, Kira Prabhu, Tiancheng Sun, Lynn Tsai, Ryan Overbeck
  Year: 2024
  ArXiv: 2411.16680
  Project: https://arxiv.org/abs/2411.16680
  Tags: Feed-Forward
  Key: We present a novel neural algorithm for performing high-quality, high-resolution, real-time novel view synthesis. From a sparse set of input RGB images or videos streams, our network both reconstructs

- Title: GPS-Gaussian+: Generalizable Pixel-wise 3D Gaussian Splatting for Real-Time Human-Scene Rendering from Sparse Views
  Authors: Boyao Zhou, Shunyuan Zheng, Hanzhang Tu, Ruizhi Shao, Boning Liu, Shengping Zhang, Liqiang Nie, Yebin Liu
  Year: 2024
  ArXiv: 2411.11363
  Project: https://yaourtb.github.io/GPS-Gaussian+
  Tags: Acceleration, Dynamic
  Key: Differentiable rendering techniques have recently shown promising results for free-viewpoint video synthesis of characters. However, such methods, either Gaussian Splatting or neural implicit renderin

- Title: Sort-free Gaussian Splatting via Weighted Sum Rendering
  Authors: Qiqi Hou, Randall Rauwendaal, Zifeng Li, Hoang Le, Farzad Farhadzadeh, Fatih Porikli, Alexei Bourd, Amir Said
  Year: 2024
  ArXiv: 2410.18931
  Tags: Acceleration
  Key: Recently, 3D Gaussian Splatting (3DGS) has emerged as a significant advancement in 3D scene reconstruction, attracting considerable attention due to its ability to recover high-fidelity details while

- Title: SplaTraj: Camera Trajectory Generation with Semantic Gaussian Splatting
  Authors: Xinyi Liu, Tianyi Zhang, Matthew Johnson-Roberson, Weiming Zhi
  Year: 2024
  ArXiv: 2410.06014
  Tags: Language Embedding
  Key: Many recent developments for robots to represent environments have focused on photorealistic reconstructions. This paper particularly focuses on generating sequences of images from the photorealistic

- Title: SuperGS: Super-Resolution 3D Gaussian Splatting via Latent Feature Field and Gradient-guided Splitting
  Authors: Shiyun Xie, Zhiru Wang, Yinghao Zhu, Chengwei Pan
  Year: 2024
  ArXiv: 2410.02571
  Tags: Densification, Feed-Forward
  Key: Recently, 3D Gaussian Splatting (3DGS) has exceled in novel view synthesis with its real-time rendering capabilities and superior quality. However, it faces challenges for high-resolution novel view s

- Title: EVER: Exact Volumetric Ellipsoid Rendering for Real-time View Synthesis
  Authors: Alexander Mai, Peter Hedman, George Kopanas, Dor Verbin, David Futschik, Qiangeng Xu, Falko Kuester, Jonathan T. Barron, Yinda Zhang
  Year: 2024
  ArXiv: 2410.01804
  Code: https://github.com/half-potato/ever_training
  Project: https://half-potato.gitlab.io/posts/ever/
  Tags: Ray Tracing
  Key: We present Exact Volumetric Ellipsoid Rendering (EVER), a method for real-time differentiable emission-only volume rendering. Unlike recent rasterization based approach by 3D Gaussian Splatting (3DGS)

- Title: EdgeGaussians -- 3D Edge Mapping via Gaussian Splatting
  Authors: Kunal Chelani, Assia Benbihi, Torsten Sattler, Fredrik Kahl
  Year: 2024
  ArXiv: 2409.12886
  Code: https://github.com/kunalchelani/EdgeGaussians
  Key: With their meaningful geometry and their omnipresence in the 3D world, edges are extremely useful primitives in computer vision. 3D edges comprise of lines and curves, and methods to reconstruct them

- Title: Fisheye-GS: Lightweight and Extensible Gaussian Splatting Module for Fisheye Cameras
  Authors: Zimu Liao, Siyan Chen, Rong Fu, Yi Wang, Zhongling Su, Hao Luo, Li Ma, Linning Xu, Bo Dai, Hengjie Li, Zhilin Pei, Xingcheng Zhang
  Year: 2024
  ArXiv: 2409.04751
  Code: https://github.com/zmliao/Fisheye-GS
  Key: Recently, 3D Gaussian Splatting (3DGS) has garnered attention for its high fidelity and real-time rendering. However, adapting 3DGS to different camera models, particularly fisheye lenses, poses chall

- Title: PRoGS: Progressive Rendering of Gaussian Splats
  Authors: Brent Zoomers, Maarten Wijnants, Ivan Molenaers, Joni Vanherck, Jeroen Put, Lode Jorissen, Nick Michiels
  Year: 2024
  ArXiv: 2409.01761
  Tags: Compression, LoD
  Key: Over the past year, 3D Gaussian Splatting (3DGS) has received significant attention for its ability to represent 3D scenes in a perceptually accurate manner. However, it can require a substantial amou

- Title: Splatt3R: Zero-shot Gaussian Splatting from Uncalibrated Image Pairs
  Authors: Brandon Smart, Chuanxia Zheng, Iro Laina, Victor Adrian Prisacariu
  Year: 2024
  ArXiv: 2408.13912
  Code: https://github.com/btsmart/splatt3r
  Project: https://splatt3r.active.vision/
  Tags: 3ster-based
  Key: In this paper, we introduce Splatt3R, a pose-free, feed-forward method for in-the-wild 3D reconstruction and novel view synthesis from stereo pairs. Given uncalibrated natural images, Splatt3R can pre

- Title: Subsurface Scattering for 3D Gaussian Splatting
  Authors: Jan-Niklas Dihlmann, Arjun Majumdar, Andreas Engelhardt, Raphael Braun, Hendrik P. A. Lensch
  Year: 2024
  ArXiv: 2408.12282
  Project: https://sss.jdihlmann.com/
  Tags: Relight
  Key: 3D reconstruction and relighting of objects made from scattering materials present a significant challenge due to the complex light transport beneath the surface. 3D Gaussian Splatting introduced high

- Title: GSCore: Efficient Radiance Field Rendering via Architectural Support for 3D Gaussian Splatting
  Authors: Junseo Lee, Seokwon Lee, Jungi Lee, Junyong Park, Jaewoong Sim
  Year: 2024
  Paper: https://jaewoong.org/pubs/asplos24-gscore.pdf
  Tags: Acceleration
  Key: This paper presents GSCore, a hardware acceleration unit that efficiently executes the rendering pipeline of 3D Gaussian Splatting with algorithmic optimizations. GSCore builds on the observations fro

- Title: Lighting Every Darkness with 3DGS: Fast Training and Real-Time Rendering for HDR View Synthesis
  Authors: Xin Jin, Pengyi Jiao, Zheng-Peng Duan, Xingchao Yang, Chun-Le Guo, Bo Ren, Chongyi Li
  Year: 2024
  ArXiv: 2406.06216
  Code: https://github.com/Srameo/LE3D
  Project: https://srameo.github.io/projects/le3d/intro.htmla
  Key: Volumetric rendering based methods, like NeRF, excel in HDR view synthesis from RAWimages, especially for nighttime scenes. While, they suffer from long training times and cannot perform real-time ren

- Title: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
  Authors: Jorge Condor, Sebastien Speierer, Lukas Bode, Aljaz Bozic, Simon Green, Piotr Didyk, Adrian Jarabo
  Year: 2024
  Code: https://github.com/facebookresearch/volumetric_primitives
  Project: https://arcanous98.github.io/projectPages/gaussianVolumes.html
  Paper: https://arcanous98.github.io/assets/data/papers/Gaussian_tracing_meta_TOG-compressed.pdf
  Tags: Physics, Ray Tracing, Relight, 360 degree, Antialiasing, Perspective-correct
  Key: Banking on the popularity of rasterized 3D Gaussian Splatting methods, we formalize the ray-tracing of volumes composed of kernel mixture models (Gaussian or otherwise). Our physically-based, path-tra

- Title: GarmentDreamer: 3DGS Guided Garment Synthesis with Diverse Geometry and Texture Details
  Authors: Boqian Li, Xuan Li, Ying Jiang, Tianyi Xie, Feng Gao, Huamin Wang, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2405.12420
  Code: https://github.com/boqian-li/GarmentDreamer
  Project: https://xuan-li.github.io/GarmentDreamerDemo/
  Tags: Avatar, Dynamic, Texturing
  Key: Traditional 3D garment creation is labor-intensive, involving sketching, modeling, UV mapping, and texturing, which are time-consuming and costly. Recent advances in diffusion-based generative models

- Title: DeblurGS: Gaussian Splatting for Camera Motion Blur
  Authors: Jeongtaek Oh, Jaeyoung Chung, Dongwoo Lee, Kyoung Mu Lee
  Year: 2024
  ArXiv: 2404.11358
  Tags: Deblurring
  Key: Although significant progress has been made in reconstructing sharp 3D scenes from motion-blurred images, a transition to realworld applications remains challenging. The primary obstacle stems from th

- Title: LoopGaussian: Creating 3D Cinemagraph with Multi-view Images via Eulerian Motion Field
  Authors: Jiyang Li, Lechao Cheng, Zhangye Wang, Tingting Mu, Jingxuan He
  Year: 2024
  ArXiv: 2404.08966
  Code: https://github.com/Pokerlishao/LoopGaussian
  Project: https://pokerlishao.github.io/LoopGaussian/
  Tags: Physics
  Key: Cinemagraph is a unique form of visual media that combines elements of still photography and subtle motion to create a captivating experience. However, the majority of videos generated by recent works

- Title: StylizedGS: Controllable Stylization for 3D Gaussian Splatting
  Authors: Dingxi Zhang, Zhuoxun Chen, Yu-Jie Yuan, Fang-Lue Zhang, Zhenliang He, Shiguang Shan, Lin Gao
  Year: 2024
  ArXiv: 2404.05220
  Tags: Style Transfer
  Key: With the rapid development of XR, 3D generation and editing are becoming more and more important, among which, stylization is an important tool of 3D appearance editing. It can achieve consistent 3D a

- Title: Dual-Camera Smooth Zoom on Mobile Phones
  Authors: Renlong Wu, Zhilu Zhang, Yu Yang, Wangmeng Zuo
  Year: 2024
  ArXiv: 2404.04908
  Code: https://github.com/ZcsrenlongZ/ZoomGS
  Project: https://dualcamerasmoothzoom.github.io/
  Tags: Misc
  Key: When zooming between dual cameras on a mobile, noticeable jumps in geometric content and image color occur in the preview, inevitably affecting the user's zoom experience. In this work, we introduce a

- Title: Robust Gaussian Splatting
  Authors: François Darmon, Lorenzo Porzi, Samuel Rota-Bulò, Peter Kontschieder
  Year: 2024
  ArXiv: 2404.04211
  Tags: Deblurring
  Key: In this paper, we address common error sources for 3D Gaussian Splatting (3DGS) including blur, imperfect camera poses, and color inconsistencies, with the goal of improving its robustness for practic

- Title: OmniGS: Omnidirectional Gaussian Splatting for Fast Radiance Field Reconstruction using Omnidirectional Images
  Authors: Jiarui Meng, Haijie Li, Yanmin Wu, Qiankun Gao, Shuzhou Yang, Jian Zhang, Siwei Ma
  Year: 2024
  ArXiv: 2404.03202
  Project: https://liquorleaf.github.io/research/OmniGS/
  Tags: 360 degree
  Key: Photorealistic reconstruction relying on 3D Gaussian Splatting has shown promising potential in robotics. However, the current 3D Gaussian Splatting system only supports radiance field reconstruction

- Title: Mirror-3DGS: Incorporating Mirror Reflections into 3D Gaussian Splatting
  Authors: Jiarui Meng, Haijie Li, Yanmin Wu, Qiankun Gao, Shuzhou Yang, Jian Zhang, Siwei Ma
  Year: 2024
  ArXiv: 2404.01168
  Project: https://mirror-gaussian.github.io/
  Key: 3D Gaussian Splatting (3DGS) has marked a significant breakthrough in the realm of 3D scene reconstruction and novel view synthesis. However, 3DGS, much like its predecessor Neural Radiance Fields (Ne

- Title: 3DGSR: Implicit Surface Reconstruction with 3D Gaussian Splatting
  Authors: Mauro Comi, Alessio Tonioni, Max Yang, Jonathan Tremblay, Valts Blukis, Yijiong Lin, Nathan F. Lepora, Laurence Aitchison
  Year: 2024
  ArXiv: 2404.00409
  Tags: Meshing
  Key: In this paper, we present an implicit surface reconstruction method with 3D Gaussian Splatting (3DGS), namely 3DGSR, that allows for accurate 3D reconstruction with intricate details while inheriting

- Title: Snap-it, Tap-it, Splat-it: Tactile-Informed 3D Gaussian Splatting for Reconstructing Challenging Surfaces
  Authors: Mauro Comi, Alessio Tonioni, Max Yang, Jonathan Tremblay, Valts Blukis, Yijiong Lin, Nathan F. Lepora, Laurence Aitchison
  Year: 2024
  ArXiv: 2403.20275
  Project: https://maxyang27896.github.io/publication/gaussian_splat/
  Key: Touch and vision go hand in hand, mutually enhancing our ability to understand the world. From a research perspective, the problem of mixing touch and vision is underexplored and presents interesting

- Title: SA-GS: Scale-Adaptive Gaussian Splatting for Training-Free Anti-Aliasing
  Authors: Xiaowei Song, Jv Zheng, Shiran Yuan, Huan-ang Gao, Jingwei Zhao, Xiang He, Weihao Gu, Hao Zhao
  Year: 2024
  ArXiv: 2403.19615
  Code: https://github.com/zsy1987/SA-GS/
  Project: https://kevinsong729.github.io/project-pages/SA-GS/
  Tags: Antialiasing
  Key: In this paper, we present a Scale-adaptive method for Anti-aliasing Gaussian Splatting (SA-GS). While the state-of-the-art method Mip-Splatting needs modifying the training procedure of Gaussian splat

- Title: Octree-GS: Towards Consistent Real-time Rendering with LOD-Structured 3D Gaussians
  Authors: Kerui Ren, Lihan Jiang, Tao Lu, Mulin Yu, Linning Xu, Zhangkai Ni, Bo Dai
  Year: 2024
  ArXiv: 2403.17898
  Code: https://github.com/city-super/Octree-GS
  Project: https://city-super.github.io/octree-gs/
  Tags: Large-Scale
  Key: The recent 3D Gaussian splatting (3D-GS) has shown remarkable rendering fidelity and efficiency compared to NeRF-based neural scene representations. While demonstrating the potential for real-time ren

- Title: GSDF: 3DGS Meets SDF for Improved Rendering and Reconstruction
  Authors: Mulin Yu, Tao Lu, Linning Xu, Lihan Jiang, Yuanbo Xiangli, Bo Dai
  Year: 2024
  ArXiv: 2403.16964
  Code: https://github.com/city-super/GSDF
  Project: https://city-super.github.io/GSDF/
  Tags: Meshing
  Key: Presenting a 3D scene from multiview images remains a core and long-standing challenge in computer vision and computer graphics. Two main requirements lie in rendering and reconstruction. Notably, SOT

- Title: Gaussian in the Wild: 3D Gaussian Splatting for Unconstrained Image Collections
  Authors: Dongbin Zhang, Chuming Wang, Weitao Wang, Peihao Li, Minghan Qin, Haoqian Wang
  Year: 2024
  ArXiv: 2403.15704
  Code: https://github.com/EastbeanZhang/Gaussian-Wild
  Project: https://eastbeanzhang.github.io/GS-W/
  Tags: In the Wild
  Key: Novel view synthesis from unconstrained in-the-wild images remains a meaningful but challenging task. The photometric variation and transient occluders in those unconstrained images make it difficult

- Title: Pixel-GS: Density Control with Pixel-aware Gradient for 3D Gaussian Splatting
  Authors: Zheng Zhang, Wenbo Hu, Yixing Lao, Tong He, Hengshuang Zhao
  Year: 2024
  ArXiv: 2403.15530
  Code: https://github.com/zhengzhang01/Pixel-GS
  Project: https://pixelgs.github.io/
  Tags: Densification
  Key: 3D Gaussian Splatting (3DGS) has demonstrated impressive novel view synthesis results while advancing real-time rendering performance. However, it relies heavily on the quality of the initial point cl

- Title: Mini-Splatting: Representing Scenes with a Constrained Number of Gaussians
  Authors: Guangchi Fang, Bing Wang
  Year: 2024
  ArXiv: 2403.14166
  Code: https://github.com/fatPeter/mini-splatting
  Tags: Densification
  Key: In this study, we explore the challenge of efficiently representing scenes with a constrained number of Gaussians. Our analysis shifts from traditional graphics and 2D computer vision to the perspecti

- Title: RadSplat: Radiance Field-Informed Gaussian Splatting for Robust Real-Time Rendering with 900+ FPS
  Authors: Michael Niemeyer, Fabian Manhardt, Marie-Julie Rakotosaona, Michael Oechsle, Daniel Duckworth, Rama Gosula, Keisuke Tateno, John Bates, Dominik Kaeser, Federico Tombari
  Year: 2024
  ArXiv: 2403.13806
  Project: https://m-niemeyer.github.io/radsplat/
  Tags: Densification, Misc
  Key: Recent advances in view synthesis and real-time rendering have achieved photorealistic quality at impressive rendering speeds. While Radiance Field-based methods achieve state-of-the-art quality in ch

- Title: Gaussian Splatting on the Move: Blur and Rolling Shutter Compensation for Natural Camera Motion
  Authors: Otto Seiskari, Jerry Ylilammi, Valtteri Kaatrasalo, Pekka Rantalankila, Matias Turkulainen, Juho Kannala, Esa Rahtu, Arno Solin
  Year: 2024
  ArXiv: 2403.13327
  Code: https://github.com/SpectacularAI/3dgs-deblur
  Project: https://spectacularai.github.io/3dgs-deblur/
  Tags: Deblurring
  Key: High-quality scene reconstruction and novel view synthesis based on Gaussian Splatting (3DGS) typically require steady, high-quality photographs, often impractical to capture with handheld cameras. We

- Title: BAD-Gaussians: Bundle Adjusted Deblur Gaussian Splatting
  Authors: Lingzhe Zhao, Peng Wang, Peidong Liu
  Year: 2024
  ArXiv: 2403.11831
  Code: https://github.com/WU-CVGL/BAD-Gaussians/
  Project: https://lingzhezhao.github.io/BAD-Gaussians/
  Tags: Deblurring
  Key: While neural rendering has demonstrated impressive capabilities in 3D scene reconstruction and novel view synthesis, it heavily relies on high-quality sharp images and accurate camera poses. Numerous

- Title: GeoGaussian: Geometry-aware Gaussian Splatting for Scene Rendering
  Authors: Yanyan Li, Chenyu Lyu, Yan Di, Guangyao Zhai, Gim Hee Lee, Federico Tombari
  Year: 2024
  ArXiv: 2403.11324
  Code: https://github.com/yanyan-li/GeoGaussian
  Project: https://yanyan-li.github.io/project/gs/geogaussian
  Tags: Densification
  Key: During the Gaussian Splatting optimization process, the scene's geometry can gradually deteriorate if its structure is not deliberately preserved, especially in non-textured regions such as walls, cei

- Title: Analytic-Splatting: Anti-Aliased 3D Gaussian Splatting via Analytic Integration
  Authors: Zhihao Liang, Qi Zhang, Wenbo Hu, Ying Feng, Lei Zhu, Kui Jia
  Year: 2024
  ArXiv: 2403.11056
  Code: https://github.com/lzhnb/Analytic-Splatting
  Project: https://lzhnb.github.io/project-pages/analytic-splatting/
  Tags: Antialiasing
  Key: The 3D Gaussian Splatting (3DGS) gained its popularity recently by combining the advantages of both primitive-based and volumetric 3D representations, resulting in improved quality and efficiency for

- Title: SWAG: Splatting in the Wild images with Appearance-conditioned Gaussians
  Authors: Hiba Dahmani, Moussab Bennehar, Nathan Piasco, Luis Roldao, Dzmitry Tsishkou
  Year: 2024
  ArXiv: 2403.10427
  Tags: In the Wild
  Key: Implicit neural representation methods have shown impressive advancements in learning 3D scenes from unstructured in-the-wild photo collections but are still limited by the large computational cost of

- Title: Touch-GS: Visual-Tactile Supervised 3D Gaussian Splatting
  Authors: Aiden Swann, Matthew Strong, Won Kyung Do, Gadiel Sznaier Camps, Mac Schwager, Monroe Kennedy III
  Year: 2024
  ArXiv: 2403.09875
  Code: https://github.com/armlabstanford/Touch-GS
  Project: https://armlabstanford.github.io/touch-gs
  Tags: Robotics, Sparse
  Key: In this work, we propose a novel method to supervise 3D Gaussian Splatting (3DGS) scenes using optical tactile sensors. Optical tactile sensors have become widespread in their use in robotics for mani

- Title: RAIN-GS: Relaxing Accurate Initialization Constraint for 3D Gaussian Splatting
  Authors: Jaewoo Jung, Jisang Han, Honggyu An, Jiwon Kang, Seonghoon Park, Seungryong Kim
  Year: 2024
  ArXiv: 2403.09413
  Code: https://github.com/cvlab-kaist/RAIN-GS
  Project: https://ku-cvlab.github.io/RAIN-GS/
  Tags: Densification
  Key: 3D Gaussian splatting (3DGS) has recently demonstrated impressive capabilities in real-time novel view synthesis and 3D reconstruction. However, 3DGS heavily depends on the accurate initialization der

- Title: Spec-Gaussian: Anisotropic View-Dependent Appearance for 3D Gaussian Splatting
  Authors: Ziyi Yang, Xinyu Gao, Yangtian Sun, Yihua Huang, Xiaoyang Lyu, Wen Zhou, Shaohui Jiao, Xiaojuan Qi, Xiaogang Jin
  Year: 2024
  ArXiv: 2402.15870
  Code: https://github.com/ingra14m/Specular-Gaussians
  Project: https://ingra14m.github.io/Spec-Gaussian-website/
  Key: The recent advancements in 3D Gaussian splatting (3D-GS) have not only facilitated real-time rendering through modern GPU rasterization pipelines but have also attained state-of-the-art rendering qual

- Title: GES: Generalized Exponential Splatting for Efficient Radiance Field Rendering
  Authors: Abdullah Hamdi, Luke Melas-Kyriazi, Guocheng Qian, Jinjie Mai, Ruoshi Liu, Carl Vondrick, Bernard Ghanem, Andrea Vedaldi
  Year: 2024
  ArXiv: 2402.10128
  Code: https://github.com/ajhamdi/ges-splatting
  Project: https://abdullahamdi.com/ges/
  Key: Advancements in 3D Gaussian Splatting have significantly accelerated 3D reconstruction and generation. However, it may require a large number of Gaussians, which creates a substantial memory footprint

- Title: 360-GS: Layout-guided Panoramic Gaussian Splatting For Indoor Roaming
  Authors: Letian Huang, Jiayang Bai, Jie Guo, Yanwen Guo
  Year: 2024
  ArXiv: 2402.00763
  Code: https://github.com/LeoDarcy/360GS
  Tags: 360 degree
  Key: 3D Gaussian Splatting (3D-GS) has recently attracted great attention with real-time and photo-realistic renderings. This technique typically takes perspective images as input and optimizes a set of 3D

- Title: On the Error Analysis of 3D Gaussian Splatting
and an Optimal Projection Strategy

  Authors: Letian Huang, Jiayang Bai, Jie Guo, Yanwen Guo
  Year: 2024
  ArXiv: 2402.00752
  Code: https://github.com/LetianHuang/op43dgs
  Project: https://letianhuang.github.io/op43dgs/
  Tags: Perspective-correct
  Key: 3D Gaussian Splatting has garnered extensive attention and application in real-time neural rendering. Concurrently, concerns have been raised about the limitations of this technology in aspects such a

- Title: StopThePop: Sorted Gaussian Splatting for View-Consistent Real-time Rendering
  Authors: Lukas Radl, Michael Steiner, Mathias Parger, Alexander Weinrauch, Bernhard Kerbl, Markus Steinberger
  Year: 2024
  ArXiv: 2402.00525
  Code: https://github.com/r4dl/StopThePop
  Project: https://r4dl.github.io/StopThePop/
  Tags: Perspective-correct
  Key: Gaussian Splatting has emerged as a prominent model for constructing 3D representations from images across diverse domains. However, the efficiency of the 3D Gaussian Splatting rendering pipeline reli

- Title: Gaussian Splashing: Dynamic Fluid Synthesis with Gaussian Splatting
  Authors: Yutao Feng, Xiang Feng, Yintong Shang, Ying Jiang, Chang Yu, Zeshun Zong, Tianjia Shao, Hongzhi Wu, Kun Zhou, Chenfanfu Jiang, Yin Yang
  Year: 2024
  ArXiv: 2401.15318
  Project: https://amysteriouscat.github.io/GaussianSplashing/
  Tags: Dynamic, Physics
  Key: We demonstrate the feasibility of integrating physics-based animations of solids and fluids with 3D Gaussian Splatting (3DGS) to create novel effects in virtual scenes reconstructed using 3DGS. Levera

- Title: Gaussian Shadow Casting for Neural Characters
  Authors: Luis Bolanos, Shih-Yang Su, Helge Rhodin
  Year: 2024
  ArXiv: 2401.06116
  Code: https://github.com/LuisBolanos17/GaussianShadowCasting
  Tags: Avatar, Relight
  Key: Neural character models can now reconstruct detailed geometry and texture from video, but they lack explicit shadows and shading, leading to artifacts when generating novel views and poses or during r

- Title: Gaussian Splatting with NeRF-based Color and Opacity
  Authors: Dawid Malarz, Weronika Smolak, Jacek Tabor, Sławomir Tadeja, Przemysław Spurek
  Year: 2023
  ArXiv: 2312.13729
  Code: https://github.com/gmum/ViewingDirectionGaussianSplatting
  Key: Neural Radiance Fields (NeRFs) have demonstrated the remarkable potential of neural networks to capture the intricacies of 3D objects. By encoding the shape and color information within neural network

- Title: GIR: 3D Gaussian Inverse Rendering for Relightable Scene Factorization
  Authors: Yahao Shi, Yanmin Wu, Chenming Wu, Xing Liu, Chen Zhao, Haocheng Feng, Jingtuo Liu, Liangjun Zhang, Jian Zhang, Bin Zhou, Errui Ding, Jingdong Wang
  Year: 2023
  ArXiv: 2312.05133
  Project: https://3dgir.github.io/
  Tags: Relight
  Key: This paper presents GIR, a 3D Gaussian Inverse Rendering method for relightable scene factorization. Compared to existing methods leveraging discrete meshes or neural implicit fields for inverse rende

- Title: DISTWAR: Fast Differentiable Rendering on Raster-based Rendering Pipelines
  Authors: Sankeerth Durvasula, Adrian Zhao, Fan Chen, Ruofan Liang, Pawan Kumar Sanjaya, Nandita Vijaykumar
  Year: 2024
  ArXiv: 2401.05345
  Code: https://github.com/Accelsnow/gaussian-splatting-distwar
  Tags: Acceleration
  Key: Differentiable rendering is a technique used in an important emerging class of visual computing applications that involves representing a 3D scene as a model that is trained from 2D images using gradi

- Title: Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering
  Authors: Tao Lu, Mulin Yu, Linning Xu, Yuanbo Xiangli, Limin Wang, Dahua Lin, Bo Dai
  Year: 2023
  ArXiv: 2312.00109
  Code: https://github.com/city-super/Scaffold-GS
  Project: https://city-super.github.io/scaffold-gs/
  Tags: Densification
  Key: Neural rendering methods have significantly advanced photo-realistic 3D scene rendering in various academic and industrial applications. The recent 3D Gaussian Splatting method has achieved the state-

- Title: GaussianShader: 3D Gaussian Splatting with Shading Functions for Reflective Surfaces
  Authors: Yingwenqi Jiang, Jiadong Tu, Yuan Liu, Xifeng Gao, Xiaoxiao Long, Wenping Wang, Yuexin Ma
  Year: 2023
  ArXiv: 2311.17977
  Code: https://github.com/Asparagus15/GaussianShader
  Project: https://asparagus15.github.io/GaussianShader.github.io/
  Tags: Relight
  Key: The advent of neural 3D Gaussians has recently brought about a revolution in the field of neural rendering, facilitating the generation of high-quality renderings at real-time speeds. However, the exp

- Title: Multi-Scale 3D Gaussian Splatting for Anti-Aliased Rendering
  Authors: Zhiwen Yan, Weng Fei Low, Yu Chen, Gim Hee Lee
  Year: 2023
  ArXiv: 2311.17089
  Tags: Antialiasing
  Key: 3D Gaussians have recently emerged as a highly efficient representation for 3D reconstruction and rendering. Despite its high rendering quality and speed at high resolutions, they both deteriorate dra

- Title: Relightable 3D Gaussian: Real-time Point Cloud Relighting with BRDF Decomposition and Ray Tracing
  Authors: Jian Gao, Chun Gu, Youtian Lin, Hao Zhu, Xun Cao, Li Zhang, Yao Yao
  Year: 2023
  ArXiv: 2311.16043
  Code: https://github.com/NJU-3DV/Relightable3DGaussian
  Project: https://nju-3dv.github.io/projects/Relightable3DGaussian/
  Tags: Ray Tracing, Relight
  Key: We present a novel differentiable point-based rendering framework for material and lighting decomposition from multi-view images, enabling editing, ray-tracing, and real-time relighting of the 3D poin

- Title: Mip-Splatting Alias-free 3D Gaussian Splatting
  Authors: Zehao Yu, Anpei Chen, Binbin Huang, Torsten Sattler, Andreas Geiger
  Year: 2023
  ArXiv: 2311.16493
  Code: https://github.com/autonomousvision/mip-splatting
  Project: https://niujinshuchong.github.io/mip-splatting/
  Tags: Antialiasing
  Key: Recently, 3D Gaussian Splatting (3DGS) has demonstrated impressive novel view synthesis results, reaching high fidelity and efficiency. However, strong artifacts can be observed when changing the samp

- Title: GS-IR: 3D Gaussian Splatting for Inverse Rendering
  Authors: Zhihao Liang, Qi Zhang, Ying Feng, Ying Shan, Kui Jia
  Year: 2023
  ArXiv: 2311.16473
  Code: https://github.com/lzhnb/GS-IR
  Project: https://github.com/lzhnb/GS-IR
  Tags: Relight
  Key: We propose GS-IR, a novel inverse rendering approach based on 3D Gaussian Splatting (GS) that leverages forward mapping volume rendering to achieve photorealistic novel view synthesis and relighting r

- Title: Gaussian Splatting for Real-Time Radiance Field Rendering
  Authors: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, George Drettakis
  Year: 2023
  ArXiv: 2308.04079
  Code: https://github.com/graphdeco-inria/gaussian-splatting
  Project: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
  Tags: Classic Work, Dynamic
  Key: Radiance Field methods have recently revolutionized novel-view synthesis of scenes captured with multiple photos or videos. However, achieving high visual quality still requires neural networks that a

- Title: Instruct-4DGS: Efficient Dynamic Scene Editing via 4D Gaussian-based Static-Dynamic Separation
  Authors: Joohyun Kwon, Hanbyel Cho, Junmo Kim
  Year: 2025
  ArXiv: 2502.02091
  Project: https://hanbyelcho.info/instruct-4dgs/
  Tags: Dynamic, Diffusion, Editing
  Key: Recent 4D dynamic scene editing methods require editing thousands of 2D images used for dynamic scene synthesis and updating the entire scene with additional training loops, resulting in several hours

================================================================================
CATEGORY: Review (10 papers)
================================================================================

- Title: Advancing Extended Reality with 3D Gaussian Splatting: Innovations and Prospects
  Authors: Shi Qiu, Binzhu Xie, Qixuan Liu, Pheng-Ann Heng
  Year: 2024
  ArXiv: 2412.06257
  Key: 3D Gaussian Splatting (3DGS) has attracted significant attention for its potential to revolutionize 3D representation, rendering, and interaction. Despite the rapid growth of 3DGS research, its direct

- Title: NeRF and Gaussian Splatting SLAM in the Wild
  Authors: Fabian Schmidt, Markus Enzweiler, Abhinav Valada
  Year: 2024
  ArXiv: 2412.03263
  Code: https://github.com/iis-esslingen/nerf-3dgs-benchmark
  Tags: In the Wild, SLAM
  Key: Navigating outdoor environments with visual Simultaneous Localization and Mapping (SLAM) systems poses significant challenges due to dynamic scenes, lighting variations, and seasonal changes, requirin

- Title: Neural Fields in Robotics: A Survey
  Authors: Muhammad Zubair Irshad, Mauro Comi, Yen-Chen Lin, Nick Heppert, Abhinav Valada, Zsolt Kira, Rares Ambrus, Johnathan Trembley
  Year: 2024
  ArXiv: 2410.20220
  Tags: Robotics
  Key: Neural Fields have emerged as a transformative approach for 3D scene representation in computer vision and robotics, enabling accurate inference of geometry, 3D semantics, and dynamics from posed 2D d

- Title: 3D Gaussian Splatting: Survey, Technologies, Challenges, and Opportunities
  Authors: Yanqi Bao, Tianyu Ding, Jing Huo, Yaoli Liu, Yuxin Li, Wenbin Li, Yang Gao, Jiebo Luo
  Year: 2024
  ArXiv: 2407.17418
  Key: 3D Gaussian Splatting (3DGS) has emerged as a prominent technique with the potential to become a mainstream method for 3D representations. It can effectively transform multi-view images into explicit

- Title: Gaussian Splatting: 3D Reconstruction and Novel View Synthesis, a Review
  Authors: Anurag Dalal, Daniel Hagen, Kjell G. Robbersmyr, Kristian Muri Knausgård
  Year: 2024
  ArXiv: 2405.03417
  Key: Image-based 3D reconstruction is a challenging task that involves inferring the 3D shape of an object or scene from a set of input images. Learning-based methods have gained attention for their abilit

- Title: Recent Advances in 3D Gaussian Splatting
  Authors: Tong Wu, Yu-Jie Yuan, Ling-Xiao Zhang, Jie Yang, Yan-Pei Cao, Ling-Qi Yan, Lin Gao
  Year: 2024
  ArXiv: 2403.11134
  Key: The emergence of 3D Gaussian Splatting (3DGS) has greatly accelerated the rendering speed of novel view synthesis. Unlike neural implicit representations like Neural Radiance Fields (NeRF) that repres

- Title: How NeRFs and 3D Gaussian Splatting are Reshaping SLAM: a Survey
  Authors: Fabio Tosi, Youmin Zhang, Ziren Gong, Erik Sandström, Stefano Mattoccia, Martin R. Oswald, Matteo Poggi
  Year: 2024
  ArXiv: 2402.13255
  Key: Over the past two decades, research in the field of Simultaneous Localization and Mapping (SLAM) has undergone a significant evolution, highlighting its critical role in enabling autonomous exploratio

- Title: 3D Gaussian as a New Vision Era: A Survey
  Authors: Ben Fei, Jingyi Xu, Rui Zhang, Qingyuan Zhou, Weidong Yang, Ying He
  Year: 2024
  ArXiv: 2402.07181
  Key: 3D Gaussian Splatting (3D-GS) has emerged as a significant advancement in the field of Computer Graphics, offering explicit scene representation and novel view synthesis without the reliance on neural

- Title: A Survey on 3D Gaussian Splatting
  Authors: Guikun Chen, Wenguan Wang
  Year: 2024
  ArXiv: 2401.03890
  Key: 3D Gaussian splatting (3D GS) has recently emerged as a transformative technique in the explicit radiance field and computer graphics landscape. This innovative approach, characterized by the utilizat

- Title: Progress and Prospects in 3D Generative AI: A Technical Overview including 3D human
  Authors: Song Bai, Jie Li
  Year: 2024
  ArXiv: 2401.02620
  Tags: Avatar
  Key: While AI-generated text and 2D images continue to expand its territory, 3D generation has gradually emerged as a trend that cannot be ignored. Since the year 2023 an abundant amount of research papers

================================================================================
CATEGORY: Robotics (23 papers)
================================================================================

- Title: LEGO-SLAM: Language-Embedded Gaussian Optimization SLAM
  Authors: Sibaek Lee, Seongbo Ha, Kyeongsu Kang, Joonyeol Choi, Seungjun Tak, Hyeonwoo Yu
  Year: 2025
  ArXiv: 2511.16144
  Code: https://github.com/Lab-of-AI-and-Robotics/LEGO-SLAM
  Project: https://lab-of-ai-and-robotics.github.io/LEGO-SLAM/
  Tags: SLAM, Language Embedding, Segmentation
  Key: Recent advances in 3D Gaussian Splatting (3DGS) have enabled Simultaneous Localization and Mapping (SLAM) systems to build photorealistic maps. However, these maps lack the open-vocabulary semantic un

- Title: FOCI: Trajectory Optimization on Gaussian Splats
  Authors: Mario Gomez Andreu, Maximum Wilder-Smith, Victor Klemm, Vaishakh Patil, Jesus Tordesillas, Marco Hutter
  Year: 2025
  ArXiv: 2505.08510
  Tags: Optimization
  Key: 3D Gaussian Splatting (3DGS) has recently gained popularity as a faster alternative to Neural Radiance Fields (NeRFs) in 3D reconstruction and view synthesis methods. Leveraging the spatial informatio

- Title: Motion Blender Gaussian Splatting for Dynamic Scene Reconstruction
  Authors: Xinyu Zhang, Haonan Chang, Yuhan Liu, Abdeslam Boularias
  Year: 2025
  ArXiv: 2503.09040
  Code: https://github.com/mlzxy/motion-blender-gs
  Project: https://mlzxy.github.io/motion-blender-gs/
  Tags: Dynamic, Editing, Segmentation
  Key: Gaussian splatting has emerged as a powerful tool for high-fidelity reconstruction of dynamic scenes. However, existing methods primarily rely on implicit motion representations, such as encoding moti

- Title: Persistent Object Gaussian Splat (POGS) for Tracking Human and Robot Manipulation of Irregularly Shaped Objects
  Authors: Justin Yu, Kush Hari, Karim El-Refai, Arnav Dalal, Justin Kerr, Chung Min Kim, Richard Cheng, Muhammad Zubair Irshad, Ken Goldberg
  Year: 2025
  ArXiv: 2503.05189
  Code: https://github.com/uynitsuj/pogs
  Project: https://berkeleyautomation.github.io/POGS/
  Tags: Language Embedding, Segmentation
  Key: Tracking and manipulating irregularly-shaped, previously unseen objects in dynamic environments is important for robotic applications in manufacturing, assembly, and logistics. Recently introduced Gau

- Title: HAMMER: Heterogeneous, Multi-Robot Semantic Gaussian Splatting
  Authors: Javier Yu, Timothy Chen, Mac Schwager
  Year: 2025
  ArXiv: 2501.14147
  Project: https://hammer-project.github.io/
  Tags: SLAM
  Key: 3D Gaussian Splatting offers expressive scene reconstruction, modeling a broad range of visual, geometric, and semantic information. However, efficient real-time map reconstruction with data streamed

- Title: EnerVerse: Envisioning Embodied Future Space for Robotics Manipulation
  Authors: Siyuan Huang, Liliang Chen, Pengfei Zhou, Shengcong Chen, Zhengkai Jiang, Yue Hu, Peng Gao, Hongsheng Li, Maoqing Yao, Guanghui Ren
  Year: 2025
  ArXiv: 2501.01895
  Project: https://sites.google.com/view/enerverse
  Tags: Dynamic
  Key: We introduce EnerVerse, a comprehensive framework for embodied future space generation specifically designed for robotic manipulation tasks. EnerVerse seamlessly integrates convolutional and bidirecti

- Title: GSplatLoc: Ultra-Precise Camera Localization via 3D Gaussian Splatting
  Authors: Atticus J. Zeller
  Year: 2024
  ArXiv: 2412.20056
  Code: https://github.com/AtticusZeller/GsplatLoc
  Tags: In the Wild, Point Cloud, Poses, SLAM
  Key: We present GSplatLoc, a camera localization method that leverages the differentiable rendering capabilities of 3D Gaussian splatting for ultra-precise pose estimation. By formulating pose estimation a

- Title: ActiveGS: Active Scene Reconstruction using Gaussian Splatting
  Authors: Liren Jin, Xingguang Zhong, Yue Pan, Jens Behley, Cyrill Stachniss, Marija Popović
  Year: 2024
  ArXiv: 2412.17769
  Tags: Meshing, SLAM
  Key: Robotics applications often rely on scene reconstructions to enable downstream tasks. In this work, we tackle the challenge of actively building an accurate map of an unknown scene using an on-board R

- Title: GaussianProperty: Integrating Physical Properties to 3D Gaussians with LMMs
  Authors: Xinli Xu, Wenhang Ge, Dicong Qiu, ZhiFei Chen, Dongyu Yan, Zhuoyun Liu, Haoyu Zhao, Hanfeng Zhao, Shunsi Zhang, Junwei Liang, Ying-Cong Chen
  Year: 2024
  ArXiv: 2412.11258
  Code: https://github.com/xxlbigbrother/Gaussian-Property
  Project: https://gaussian-property.github.io/
  Tags: Language Embedding
  Key: Estimating physical properties for visual data is a crucial task in computer vision, graphics, and robotics, underpinning applications such as augmented reality, physical simulation, and robotic grasp

- Title: 3DGS-CD: 3D Gaussian Splatting-based Change Detection for Physical Object Rearrangement
  Authors: Ziqi Lu, Jianbo Ye, John Leonard
  Year: 2024
  ArXiv: 2411.03706
  Key: We present 3DGS-CD, the first 3D Gaussian Splatting (3DGS)-based method for detecting physical object rearrangements in 3D scenes. Our approach estimates 3D object-level changes by comparing two sets

- Title: Neural Fields in Robotics: A Survey
  Authors: Muhammad Zubair Irshad, Mauro Comi, Yen-Chen Lin, Nick Heppert, Abhinav Valada, Zsolt Kira, Rares Ambrus, Johnathan Trembley
  Year: 2024
  ArXiv: 2410.20220
  Tags: Review
  Key: Neural Fields have emerged as a transformative approach for 3D scene representation in computer vision and robotics, enabling accurate inference of geometry, 3D semantics, and dynamics from posed 2D d

- Title: Language-Embedded Gaussian Splats (LEGS): Incrementally Building Room-Scale Representations with a Mobile Robot
  Authors: Justin Yu, Kush Hari, Kishore Srinivas, Karim El-Refai, Adam Rashid, Chung Min Kim, Justin Kerr, Richard Cheng, Muhammad Zubair Irshad, Ashwin Balakrishna, Thomas Kollar, Ken Goldberg
  Year: 2024
  ArXiv: 2409.18108
  Code: https://github.com/BerkeleyAutomation/L3GS
  Project: https://berkeleyautomation.github.io/LEGS/
  Tags: Language Embedding, Segmentation
  Key: Building semantic 3D maps is valuable for searching for objects of interest in offices, warehouses, stores, and homes. We present a mapping system that incrementally builds a Language-Embedded Gaussia

- Title: BEINGS: Bayesian Embodied Image-goal Navigation with Gaussian Splatting
  Authors: Wugang Meng, Tianfu Wu, Huan Yin, Fumin Zhang
  Year: 2024
  ArXiv: 2409.10216
  Code: https://github.com/guaMass/BEINGS
  Project: https://www.mwg.ink/BEINGS-web
  Tags: Autonomous Driving
  Key: Image-goal navigation enables a robot to reach the location where a target image was captured, using visual cues for guidance. However, current methods either rely heavily on data and computationally

- Title: Radiance Fields for Robotic Teleoperation
  Authors: Maximum Wilder-Smith, Vaishakh Patil, Marco Hutter
  Year: 2024
  ArXiv: 2407.20194
  Code: https://github.com/leggedrobotics/radiance_field_ros
  Project: https://leggedrobotics.github.io/rffr.github.io/
  Tags: Misc
  Key: Radiance field methods such as Neural Radiance Fields (NeRFs) or 3D Gaussian Splatting (3DGS), have revolutionized graphics and novel view synthesis. Their ability to synthesize new viewpoints with ph

- Title: Reinforcement Learning with Generalizable Gaussian Splatting
  Authors: Jiaxu Wang, Qiang Zhang, Jingkai Sun, Jiahang Cao, Yecheng Shao, Renjing Xu
  Year: 2024
  ArXiv: 2404.07950
  Tags: Misc
  Key: An excellent representation is crucial for reinforcement learning (RL) performance, especially in vision-based reinforcement learning tasks. The quality of the environment representation directly infl

- Title: GaussNav: Gaussian Splatting for Visual Navigation
  Authors: Xiaohan Lei, Min Wang, Wengang Zhou, Houqiang Li
  Year: 2024
  ArXiv: 2403.11625
  Code: https://github.com/XiaohanLei/GaussNav
  Project: https://xiaohanlei.github.io/projects/GaussNav/
  Tags: Autonomous Driving
  Key: In embodied vision, Instance ImageGoal Navigation (IIN) requires an agent to locate a specific object depicted in a goal image within an unexplored environment. The primary difficulty of IIN stems fro

- Title: Beyond Uncertainty: Risk-Aware Active View Acquisition for Safe Robot Navigation and 3D Scene Understanding with FisherRF
  Authors: Guangyi Liu, Wen Jiang, Boshu Lei, Vivek Pandey, Kostas Daniilidis, Nader Motee
  Year: 2024
  ArXiv: 2403.11396
  Tags: Autonomous Driving, Uncertainty
  Key: This work proposes a novel approach to bolster both the robot's risk assessment and safety measures while deepening its understanding of 3D scenes, which is achieved by leveraging Radiance Field (RF)

- Title: DarkGS: Learning Neural Illumination and 3D Gaussians Relighting for Robotic Exploration in the Dark
  Authors: Tianyi Zhang, Kaining Huang, Weiming Zhi, Matthew Johnson-Roberson
  Year: 2024
  ArXiv: 2403.10814
  Code: https://github.com/tyz1030/darkgs
  Tags: Misc
  Key: Humans have the remarkable ability to construct consistent mental models of an environment, even under limited or varying levels of illumination. We wish to endow robots with this same capability. In

- Title: Touch-GS: Visual-Tactile Supervised 3D Gaussian Splatting
  Authors: Aiden Swann, Matthew Strong, Won Kyung Do, Gadiel Sznaier Camps, Mac Schwager, Monroe Kennedy III
  Year: 2024
  ArXiv: 2403.09875
  Code: https://github.com/armlabstanford/Touch-GS
  Project: https://armlabstanford.github.io/touch-gs
  Tags: Rendering, Sparse
  Key: In this work, we propose a novel method to supervise 3D Gaussian Splatting (3DGS) scenes using optical tactile sensors. Optical tactile sensors have become widespread in their use in robotics for mani

- Title: GaussianGrasper: 3D Language Gaussian Splatting for Open-vocabulary Robotic Grasping
  Authors: Yuhang Zheng, Xiangyu Chen, Yupeng Zheng, Songen Gu, Runyi Yang, Bu Jin, Pengfei Li, Chengliang Zhong, Zengmao Wang, Lina Liu, Chao Yang, Dawei Wang, Zhen Chen, Xiaoxiao Long, Meiqing Wang
  Year: 2024
  ArXiv: 2403.09637
  Code: https://github.com/MrSecant/GaussianGrasper
  Project: https://mrsecant.github.io/GaussianGrasper/
  Tags: Language Embedding, Segmentation
  Key: Constructing a 3D scene capable of accommodating open-ended language queries, is a pivotal pursuit, particularly within the domain of robotics. Such technology facilitates robots in executing object m

- Title: ManiGaussian: Dynamic Gaussian Splatting for Multi-task Robotic Manipulation
  Authors: Guanxing Lu, Shiyi Zhang, Ziwei Wang, Changliu Liu, Jiwen Lu, Yansong Tang
  Year: 2024
  ArXiv: 2403.08321
  Code: https://github.com/GuanxingLu/ManiGaussian
  Project: https://guanxinglu.github.io/ManiGaussian/
  Tags: Dynamic
  Key: Performing language-conditioned robotic manipulation tasks in unstructured environments is highly demanded for general intelligent robots. Conventional robotic manipulation methods usually learn seman

- Title: Splat-Nav: Safe Real-Time Robot Navigation in Gaussian Splatting Maps
  Authors: Timothy Chen, Ola Shorinwa, Weijia Zeng, Joseph Bruno, Philip Dames, Mac Schwager
  Year: 2024
  ArXiv: 2403.02751
  Key: We present Splat-Nav, a navigation pipeline that consists of a real-time safe planning module and a robust state estimation module designed to operate in the Gaussian Splatting (GSplat) environment re

- Title: Next Best Sense: Guiding Vision and Touch with FisherRF for 3D Gaussian Splatting
  Authors: Matthew Strong, Boshu Lei, Aiden Swann, Wen Jiang, Kostas Daniilidis, Monroe Kennedy III
  Year: 2024
  ArXiv: 2401.16663
  Code: https://github.com/armlabstanford/NextBestSense
  Project: https://armlabstanford.github.io/next-best-sense
  Tags: Misc
  Key: We propose a framework for active next best view and touch selection for robotic manipulators using 3D Gaussian Splatting (3DGS). 3DGS is emerging as a useful explicit 3D scene representation for robo

================================================================================
CATEGORY: SLAM (30 papers)
================================================================================

- Title: LEGO-SLAM: Language-Embedded Gaussian Optimization SLAM
  Authors: Sibaek Lee, Seongbo Ha, Kyeongsu Kang, Joonyeol Choi, Seungjun Tak, Hyeonwoo Yu
  Year: 2025
  ArXiv: 2511.16144
  Code: https://github.com/Lab-of-AI-and-Robotics/LEGO-SLAM
  Project: https://lab-of-ai-and-robotics.github.io/LEGO-SLAM/
  Tags: Language Embedding, Robotics, Segmentation
  Key: Recent advances in 3D Gaussian Splatting (3DGS) have enabled Simultaneous Localization and Mapping (SLAM) systems to build photorealistic maps. However, these maps lack the open-vocabulary semantic un

- Title: HAMMER: Heterogeneous, Multi-Robot Semantic Gaussian Splatting
  Authors: Javier Yu, Timothy Chen, Mac Schwager
  Year: 2025
  ArXiv: 2501.14147
  Project: https://hammer-project.github.io/
  Tags: Robotics
  Key: 3D Gaussian Splatting offers expressive scene reconstruction, modeling a broad range of visual, geometric, and semantic information. However, efficient real-time map reconstruction with data streamed

- Title: VINGS-Mono: Visual-Inertial Gaussian Splatting Monocular SLAM in Large Scenes
  Authors: Ke Wu, Zicheng Zhang, Muer Tie, Ziqing Ai, Zhongxue Gan, Wenchao Ding
  Year: 2025
  ArXiv: 2501.08286
  Tags: Large-Scale, Meshing
  Key: VINGS-Mono is a monocular (inertial) Gaussian Splatting (GS) SLAM framework designed for large scenes. The framework comprises four main components: VIO Front End, 2D Gaussian Map, NVS Loop Closure, a

- Title: Scaffold-SLAM: Structured 3D Gaussians for Simultaneous Localization and Photorealistic Mapping
  Authors: Wen Tianci, Liu Zhiang, Lu Biao, Fang Yongchun
  Year: 2025
  ArXiv: 2501.05242
  Key: 3D Gaussian Splatting (3DGS) has recently revolutionized novel view synthesis in the Simultaneous Localization and Mapping (SLAM). However, existing SLAM methods utilizing 3DGS have failed to provide

- Title: GSplatLoc: Ultra-Precise Camera Localization via 3D Gaussian Splatting
  Authors: Atticus J. Zeller
  Year: 2024
  ArXiv: 2412.20056
  Code: https://github.com/AtticusZeller/GsplatLoc
  Tags: In the Wild, Point Cloud, Poses, Robotics
  Key: We present GSplatLoc, a camera localization method that leverages the differentiable rendering capabilities of 3D Gaussian splatting for ultra-precise pose estimation. By formulating pose estimation a

- Title: ActiveGS: Active Scene Reconstruction using Gaussian Splatting
  Authors: Liren Jin, Xingguang Zhong, Yue Pan, Jens Behley, Cyrill Stachniss, Marija Popović
  Year: 2024
  ArXiv: 2412.17769
  Tags: Meshing, Robotics
  Key: Robotics applications often rely on scene reconstructions to enable downstream tasks. In this work, we tackle the challenge of actively building an accurate map of an unknown scene using an on-board R

- Title: MASt3R-SLAM: Real-Time Dense SLAM with 3D Reconstruction Priors
  Authors: Riku Murai, Eric Dexheimer, Andrew J. Davison
  Year: 2024
  ArXiv: 2412.12392
  Tags: 3ster-based
  Key: We present a real-time monocular dense SLAM system designed bottom-up from MASt3R, a two-view 3D reconstruction and matching prior. Equipped with this strong prior, our system is robust on in-the-wild

- Title: SLAM3R: Real-Time Dense Scene Reconstruction from Monocular RGB Videos
  Authors: Yuzheng Liu, Siyan Dong, Shuzhe Wang, Yanchao Yang, Qingnan Fan, Baoquan Chen
  Year: 2024
  ArXiv: 2412.09401
  Code: https://github.com/PKU-VCL-3DV/SLAM3R
  Tags: 3ster-based
  Key: In this paper, we introduce SLAM3R, a novel and effective monocular RGB SLAM system for real-time and high-quality dense 3D reconstruction. SLAM3R provides an end-to-end solution by seamlessly integra

- Title: NeRF and Gaussian Splatting SLAM in the Wild
  Authors: Fabian Schmidt, Markus Enzweiler, Abhinav Valada
  Year: 2024
  ArXiv: 2412.03263
  Code: https://github.com/iis-esslingen/nerf-3dgs-benchmark
  Tags: In the Wild, Review
  Key: Navigating outdoor environments with visual Simultaneous Localization and Mapping (SLAM) systems poses significant challenges due to dynamic scenes, lighting variations, and seasonal changes, requirin

- Title: MAGiC-SLAM: Multi-Agent Gaussian Globally Consistent SLAM
  Authors: Vladimir Yugay, Theo Gevers, Martin R. Oswald
  Year: 2025
  ArXiv: 2411.16785
  Project: https://vladimiryugay.github.io/magic_slam/index.html
  Key: Simultaneous localization and mapping (SLAM) systems with novel view synthesis capabilities are widely used in computer vision, with applications in augmented reality, robotics, and autonomous driving

- Title: DGS-SLAM: Gaussian Splatting SLAM in Dynamic Environment
  Authors: Mangyu Kong, Jaewon Lee, Seongwon Lee, Euntai Kim
  Year: 2024
  ArXiv: 2411.10722
  Key: We introduce Dynamic Gaussian Splatting SLAM (DGS-SLAM), the first dynamic SLAM framework built on the foundation of Gaussian Splatting. While recent advancements in dense SLAM have leveraged Gaussian

- Title: MBA-SLAM: Motion Blur Aware Dense Visual SLAM with Radiance Fields Representation
  Authors: Peng Wang, Lingzhe Zhao, Yin Zhang, Shiyu Zhao, Peidong Liu
  Year: 2024
  ArXiv: 2411.08279
  Project: https://wangpeng000.github.io/MBA-SLAM/
  Key: Emerging 3D scene representations, such as Neural Radiance Fields (NeRF) and 3D Gaussian Splatting (3DGS), have demonstrated their effectiveness in Simultaneous Localization and Mapping (SLAM) for pho

- Title: 3D Reconstruction with Spatial Memory
  Authors: Hengyi Wang, Lourdes Agapito
  Year: 2024
  ArXiv: 2408.16061
  Code: https://github.com/HengyiWang/spann3r
  Project: https://hengyiwang.github.io/projects/spanner
  Tags: 3ster-based
  Key: We present Spann3R, a novel approach for dense 3D reconstruction from ordered or unordered image collections. Built on the DUSt3R paradigm, Spann3R uses a transformer-based architecture to directly re

- Title: LoopSplat: Loop Closure by Registering 3D Gaussian Splats
  Authors: Liyuan Zhu, Yue Li, Erik Sandström, Shengyu Huang, Konrad Schindler, Iro Armeni
  Year: 2024
  ArXiv: 2408.10154
  Code: https://github.com/GradientSpaces/LoopSplat
  Project: https://loopsplat.github.io/
  Key: Simultaneous Localization and Mapping (SLAM) based on 3D Gaussian Splats (3DGS) has recently shown promise towards more accurate, dense 3D scene maps. However, existing 3DGS-based methods fail to addr

- Title: RTG-SLAM: Real-time 3D Reconstruction at Scale using Gaussian Splatting
  Authors: Zhexi Peng, Tianjia Shao, Yong Liu, Jingke Zhou, Yin Yang, Jingdong Wang, Kun Zhou
  Year: 2024
  ArXiv: 2404.19706
  Code: https://github.com/MisEty/RTG-SLAM
  Project: https://gapszju.github.io/RTG-SLAM/
  Key: We present Real-time Gaussian SLAM (RTG-SLAM), a real-time 3D reconstruction system with an RGBD camera for large-scale environments using Gaussian splatting. The system features a compact Gaussian re

- Title: Gaussian-LIC: Photo-realistic LiDAR-Inertial-Camera SLAM with 3D Gaussian Splatting
  Authors: Xiaolei Lang, Laijian Li, Hang Zhang, Feng Xiong, Mu Xu, Yong Liu, Xingxing Zuo, Jiajun Lv
  Year: 2024
  ArXiv: 2404.06926
  Project: https://xingxingzuo.github.io/gaussian_lic/
  Key: We present a real-time LiDAR-Inertial-Camera SLAM system with 3D Gaussian Splatting as the mapping backend. Leveraging robust pose estimates from our LiDAR-Inertial-Camera odometry, Coco-LIC, an incre

- Title: MM3DGS SLAM: Multi-modal 3D Gaussian Splatting for SLAM Using Vision, Depth, and Inertial Measurements
  Authors: Lisong C. Sun, Neel P. Bhatt, Jonathan C. Liu, Zhiwen Fan, Zhangyang Wang, Todd E. Humphreys, Ufuk Topcu
  Year: 2024
  ArXiv: 2404.00923
  Code: https://github.com/VITA-Group/MM3DGS-SLAM
  Project: https://vita-group.github.io/MM3DGS-SLAM/
  Key: Simultaneous localization and mapping is essential for position tracking and scene understanding. 3D Gaussian-based map representations enable photorealistic reconstruction and real-time rendering of

- Title: CG-SLAM: Efficient Dense RGB-D SLAM in a Consistent Uncertainty-aware 3D Gaussian Field
  Authors: Jiarui Hu, Xianhao Chen, Boyin Feng, Guanglin Li, Liangjing Yang, Hujun Bao, Guofeng Zhang, Zhaopeng Cui
  Year: 2024
  ArXiv: 2403.16095
  Project: https://zju3dv.github.io/cg-slam/
  Key: Recently neural radiance fields (NeRF) have been widely exploited as 3D representations for dense simultaneous localization and mapping (SLAM). Despite their notable successes in surface modeling and

- Title: EndoGSLAM: Real-Time Dense Reconstruction and Tracking in Endoscopic Surgeries using Gaussian Splatting
  Authors: Kailing Wang, Chen Yang, Yuehao Wang, Sikuang Li, Yan Wang, Qi Dou, Xiaokang Yang, Wei Shen
  Year: 2024
  ArXiv: 2403.15124
  Code: https://github.com/endogslam/EndoGSLAM
  Project: https://endogslam.loping151.com/
  Tags: Medicine
  Key: Precise camera tracking, high-fidelity 3D tissue reconstruction, and real-time online visualization are critical for intrabody medical imaging devices such as endoscopes and capsule robots. However, e

- Title: RGBD GS-ICP SLAM
  Authors: Seongbo Ha, Jiung Yeon, Hyeonwoo Yu
  Year: 2024
  ArXiv: 2403.12550
  Code: https://github.com/Lab-of-AI-and-Robotics/GS_ICP_SLAM
  Key: Simultaneous Localization and Mapping (SLAM) with dense representation plays a key role in robotics, Virtual Reality (VR), and Augmented Reality (AR) applications. Recent advancements in dense represe

- Title: High-Fidelity SLAM Using Gaussian Splatting with Rendering-Guided Densification and Regularized Optimization
  Authors: Shuo Sun, Malcolm Mielle, Achim J. Lilienthal, Martin Magnusson
  Year: 2024
  ArXiv: 2403.12535
  Key: We propose a dense RGBD SLAM system based on 3D Gaussian Splatting that provides metrically accurate pose tracking and visually realistic reconstruction. To this end, we first propose a Gaussian densi

- Title: NEDS-SLAM: A Novel Neural Explicit Dense Semantic SLAM Framework using 3D Gaussian Splatting
  Authors: Yiming Ji, Yang Liu, Guanghu Xie, Boyu Ma, Zongwu Xie
  Year: 2024
  ArXiv: 2403.11679
  Key: We propose NEDS-SLAM, an Explicit Dense semantic SLAM system based on 3D Gaussian representation, that enables robust 3D semantic mapping, accurate camera tracking, and high-quality rendering in real-

- Title: Compact 3D Gaussian Splatting For Dense Visual SLAM
  Authors: Tianchen Deng, Yaohui Chen, Leyan Zhang, Jianfei Yang, Shenghai Yuan, Danwei Wang, Weidong Chen
  Year: 2024
  ArXiv: 2403.11247
  Key: Recent work has shown that 3D Gaussian-based SLAM enables high-quality reconstruction, accurate pose estimation, and real-time rendering of scenes. However, these approaches are built on a tremendous

- Title: SemGauss-SLAM: Dense Semantic Gaussian Splatting SLAM
  Authors: Siting Zhu, Renjie Qin, Guangming Wang, Jiuming Liu, Hesheng Wang
  Year: 2024
  ArXiv: 2403.07494
  Key: We propose SemGauss-SLAM, the first semantic SLAM system utilizing 3D Gaussian representation, that enables accurate 3D semantic mapping, robust camera tracking, and high-quality rendering in real-tim

- Title: SGS-SLAM: Semantic Gaussian Splatting For Neural Dense SLAM
  Authors: Mingrui Li, Shuhong Liu, Heng Zhou
  Year: 2024
  ArXiv: 2402.03246
  Code: https://github.com/ShuhongLL/SGS-SLAM
  Key: Semantic understanding plays a crucial role in Dense Simultaneous Localization and Mapping (SLAM), facilitating comprehensive scene interpretation. Recent advancements that integrate Gaussian Splattin

- Title: Gaussian Splatting SLAM
  Authors: Hidenobu Matsuki, Riku Murai, Paul H. J. Kelly, Andrew J. Davison
  Year: 2023
  ArXiv: 2312.06741
  Code: https://github.com/muskie82/MonoGS
  Project: https://rmurai.co.uk/projects/GaussianSplattingSLAM/
  Key: We present the first application of 3D Gaussian Splatting to incremental 3D reconstruction using a single moving monocular or RGB-D camera. Our Simultaneous Localisation and Mapping (SLAM) method, whi

- Title: Gaussian-SLAM: Photo-realistic Dense SLAM with Gaussian Splatting
  Authors: Vladimir Yugay, Yue Li, Theo Gevers, Martin R. Oswald
  Year: 2023
  ArXiv: 2312.10070
  Code: https://github.com/VladimirYugay/Gaussian-SLAM
  Project: https://vladimiryugay.github.io/gaussian_slam/
  Key: We present the first neural RGBD SLAM method capable of photorealistically reconstructing real-world scenes. Despite modern SLAM methods achieving impressive results on synthetic datasets, they still

- Title: SplaTAM: Splat, Track & Map 3D Gaussians for Dense RGB-D SLAM
  Authors: Nikhil Keetha, Jay Karhade, Krishna Murthy Jatavallabhula, Gengshan Yang,
  Year: 2023
  ArXiv: 2312.02126
  Code: https://github.com/spla-tam/SplaTAM
  Project: https://spla-tam.github.io/
  Key: Dense simultaneous localization and mapping (SLAM) is pivotal for embodied scene understanding. Recent work has shown that 3D Gaussians enable high-quality reconstruction and real-time rendering of sc

- Title: Photo-SLAM: Real-time Simultaneous Localization and Photorealistic Mapping for Monocular, Stereo, and RGB-D Cameras
  Authors: Huajian Huang, Longwei Li, Hui Cheng, Sai-Kit Yeung
  Year: 2023
  ArXiv: 2311.16728
  Code: https://github.com/HuajianUP/Photo-SLAM
  Project: https://huajianup.github.io/research/Photo-SLAM/
  Key: The integration of neural rendering and the SLAM system recently showed promising results in joint localization and photorealistic view reconstruction. However, existing methods, fully relying on impl

- Title: GS-SLAM: Dense Visual SLAM with 3D Gaussian Splatting
  Authors: Chi Yan, Delin Qu, Dong Wang, Dan Xu, Zhigang Wang, Bin Zhao, Xuelong Li
  Year: 2023
  ArXiv: 2311.11700
  Code: https://github.com/yanchi-3dv/diff-gaussian-rasterization-for-gsslam
  Project: https://gs-slam.github.io/
  Key: In this paper, we introduce GS-SLAM that first utilizes 3D Gaussian representation in the Simultaneous Localization and Mapping (SLAM) system. It facilitates a better balance between efficiency and ac

================================================================================
CATEGORY: Segmentation (33 papers)
================================================================================

- Title: LEGO-SLAM: Language-Embedded Gaussian Optimization SLAM
  Authors: Sibaek Lee, Seongbo Ha, Kyeongsu Kang, Joonyeol Choi, Seungjun Tak, Hyeonwoo Yu
  Year: 2025
  ArXiv: 2511.16144
  Code: https://github.com/Lab-of-AI-and-Robotics/LEGO-SLAM
  Project: https://lab-of-ai-and-robotics.github.io/LEGO-SLAM/
  Tags: SLAM, Language Embedding, Robotics
  Key: Recent advances in 3D Gaussian Splatting (3DGS) have enabled Simultaneous Localization and Mapping (SLAM) systems to build photorealistic maps. However, these maps lack the open-vocabulary semantic un

- Title: Learning Unified Representation of 3D Gaussian Splatting
  Authors: Yuelin Xin, Yuheng Liu, Xiaohui Xie, Xinke Li
  Year: 2025
  ArXiv: 2509.22917
  Code: https://github.com/cilix-ai/gs-embedding
  Project: https://cilix-ai.github.io/gs-embedding-page/
  Tags: Compression, Feed-Forward, Point Cloud
  Key: A well-designed vectorized representation is crucial for the learning systems natively based on 3D Gaussian Splatting. While 3DGS enables efficient and explicit 3D reconstruction, its parameter-based

- Title: ObjectGS: Object-aware Scene Reconstruction and Scene Understanding via Gaussian Splatting
  Authors: Ruijie Zhu, Mulin Yu, Linning Xu, Lihan Jiang, Yixuan Li, Tianzhu Zhang, Jiangmiao Pang, Bo Dai
  Year: 2025
  ArXiv: 2507.15454
  Code: https://github.com/RuijieZhu94/ObjectGS
  Project: https://ruijiezhu94.github.io/ObjectGS_page/
  Tags: Language Embedding
  Key: 3D Gaussian Splatting is renowned for its high-fidelity reconstructions and real-time novel view synthesis, yet its lack of semantic understanding limits object-level perception. In this work, we prop

- Title: Motion Blender Gaussian Splatting for Dynamic Scene Reconstruction
  Authors: Xinyu Zhang, Haonan Chang, Yuhan Liu, Abdeslam Boularias
  Year: 2025
  ArXiv: 2503.09040
  Code: https://github.com/mlzxy/motion-blender-gs
  Project: https://mlzxy.github.io/motion-blender-gs/
  Tags: Dynamic, Editing, Robotics
  Key: Gaussian splatting has emerged as a powerful tool for high-fidelity reconstruction of dynamic scenes. However, existing methods primarily rely on implicit motion representations, such as encoding moti

- Title: Persistent Object Gaussian Splat (POGS) for Tracking Human and Robot Manipulation of Irregularly Shaped Objects
  Authors: Justin Yu, Kush Hari, Karim El-Refai, Arnav Dalal, Justin Kerr, Chung Min Kim, Richard Cheng, Muhammad Zubair Irshad, Ken Goldberg
  Year: 2025
  ArXiv: 2503.05189
  Code: https://github.com/uynitsuj/pogs
  Project: https://berkeleyautomation.github.io/POGS/
  Tags: Language Embedding, Robotics
  Key: Tracking and manipulating irregularly-shaped, previously unseen objects in dynamic environments is important for robotic applications in manufacturing, assembly, and logistics. Recently introduced Gau

- Title: Lifting by Gaussians: A Simple, Fast and Flexible Method for 3D Instance Segmentation
  Authors: Rohan Chacko, Nicolai Haeni, Eldar Khaliullin, Lin Sun, Douglas Lee
  Year: 2025
  ArXiv: 2502.00173
  Tags: Language Embedding, Virtual Reality
  Key: We introduce Lifting By Gaussians (LBG), a novel approach for open-world instance segmentation of 3D Gaussian Splatted Radiance Fields (3DGS). Recently, 3DGS Fields have emerged as a highly efficient

- Title: GAGS: Granularity-Aware Feature Distillation for Language Gaussian Splatting
  Authors: Yuning Peng, Haiping Wang, Yuan Liu, Chenglu Wen, Zhen Dong, Bisheng Yang
  Year: 2024
  ArXiv: 2412.13654
  Code: https://github.com/WHU-USI3DV/GAGS
  Project: https://pz0826.github.io/GAGS-Webpage/
  Tags: Language Embedding
  Key: 3D open-vocabulary scene understanding, which accurately perceives complex semantic properties of objects in space, has gained significant attention in recent years. In this paper, we propose GAGS, a

- Title: SuperGSeg: Open-Vocabulary 3D Segmentation with Structured Super-Gaussians
  Authors: Siyun Liang, Sen Wang, Kunyi Li, Michael Niemeyer, Stefano Gasperini, Nassir Navab, Federico Tombari
  Year: 2024
  ArXiv: 2412.10231
  Project: https://supergseg.github.io/
  Tags: Language Embedding
  Key: 3D Gaussian Splatting has recently gained traction for its efficient training and real-time rendering. While the vanilla Gaussian Splatting representation is mainly designed for view synthesis, more r

- Title: Occam's LGS: A Simple Approach for Language Gaussian Splatting
  Authors: Jiahuan (Joanna) Cheng, Jan-Nico Zaech, Luc Van Gool, Danda Pani Paudel
  Year: 2024
  ArXiv: 2412.01807
  Project: https://insait-institute.github.io/OccamLGS/
  Tags: Acceleration, Language Embedding
  Key: Gaussian Splatting is a widely adopted approach for 3D scene representation that offers efficient, high-quality 3D reconstruction and rendering. A major reason for the success of 3DGS is its simplicit

- Title: SADG: Segment Any Dynamic Gaussians Without Object Trackers
  Authors: Yun-Jin Li, Mariia Gladkova, Yan Xia, Daniel Cremers
  Year: 2024
  ArXiv: 2411.19290
  Project: https://yunjinli.github.io/project-sadg/
  Tags: Dynamic
  Key: Understanding dynamic 3D scenes is fundamental for various applications, including extended reality (XR) and autonomous driving. Effectively integrating semantic information into 3D reconstruction ena

- Title: Gradient-Weighted Feature Back-Projection: A Fast Alternative to Feature Distillation in 3D Gaussian Splatting
  Authors: Joji Joseph, Bharadwaj Amrutur, Shalabh Bhatnagar
  Year: 2024
  ArXiv: 2411.15193
  Code: https://github.com/JojiJoseph/3dgs-gradient-backprojection
  Project: https://jojijoseph.github.io/3dgs-backprojection/
  Tags: Editing, Language Embedding
  Key: We introduce a training-free method for feature field rendering in Gaussian splatting. Our approach back-projects 2D features into pre-trained 3D Gaussians, using a weighted sum based on each Gaussian

- Title: Large Spatial Model: End-to-end Unposed Images to Semantic 3D
  Authors: Zhiwen Fan, Jian Zhang, Wenyan Cong, Peihao Wang, Renjie Li, Kairun Wen, Shijie Zhou, Achuta Kadambi, Zhangyang Wang, Danfei Xu, Boris Ivanovic, Marco Pavone, Yue Wang
  Year: 2024
  ArXiv: 2410.18956
  Code: https://github.com/NVlabs/LSM
  Project: https://largespatialmodel.github.io/
  Tags: Feed-Forward, Poses
  Key: Reconstructing and understanding 3D structures from a limited number of images is a well-established problem in computer vision. Traditional methods usually break this task into multiple subtasks, eac

- Title: Language-Embedded Gaussian Splats (LEGS): Incrementally Building Room-Scale Representations with a Mobile Robot
  Authors: Justin Yu, Kush Hari, Kishore Srinivas, Karim El-Refai, Adam Rashid, Chung Min Kim, Justin Kerr, Richard Cheng, Muhammad Zubair Irshad, Ashwin Balakrishna, Thomas Kollar, Ken Goldberg
  Year: 2024
  ArXiv: 2409.18108
  Code: https://github.com/BerkeleyAutomation/L3GS
  Project: https://berkeleyautomation.github.io/LEGS/
  Tags: Language Embedding, Robotics
  Key: Building semantic 3D maps is valuable for searching for objects of interest in offices, warehouses, stores, and homes. We present a mapping system that incrementally builds a Language-Embedded Gaussia

- Title: Gradient-Driven 3D Segmentation and Affordance Transfer in Gaussian Splatting Using 2D Masks
  Authors: Joji Joseph, Bharadwaj Amrutur, Shalabh Bhatnagar
  Year: 2024
  ArXiv: 2409.11681
  Code: https://github.com/JojiJoseph/3dgs-gradient-segmentation
  Project: https://jojijoseph.github.io/3dgs-segmentation/
  Key: In this paper, we introduce a novel voting-based method that extends 2D segmentation models to 3D Gaussian splats. Our approach leverages masked gradients, where gradients are filtered by input 2D mas

- Title: Rethinking Open-Vocabulary Segmentation of Radiance Fields in 3D Space
  Authors: Hyunjee Lee*, Youngsik Yun*, Jeongmin Bae, Seoha Kim, Youngjung Uh
  Year: 2024
  ArXiv: 2408.07416
  Code: https://github.com/hyunji12/Open3DRF
  Project: https://hyunji12.github.io/Open3DRF/
  Tags: Language Embedding
  Key: Understanding the 3D semantics of a scene is a fundamental problem for various scenarios such as embodied agents. While NeRFs and 3DGS excel at novel-view synthesis, previous methods for understanding

- Title: Query3D: LLM-Powered Open-Vocabulary Scene Segmentation with Language Embedded 3D Gaussian
  Authors: Amirhosein Chahe, Lifeng Zhou
  Year: 2024
  ArXiv: 2408.03516
  Code: https://github.com/Zhourobotics/Query-3DGS-LLM
  Tags: Language Embedding
  Key: This paper introduces a novel method for open-vocabulary 3D scene querying in autonomous driving by combining Language Embedded 3D Gaussians with Large Language Models (LLMs). We propose utilizing LLM

- Title: Segment Any 4D Gaussians
  Authors: Shengxiang Ji, Guanjun Wu, Jiemin Fang, Jiazhong Cen, Taoran Yi, Wenyu Liu, Qi Tian, Xinggang Wang
  Year: 2024
  ArXiv: 2407.04504
  Project: https://jsxzs.github.io/sa4d/
  Key: Modeling, understanding, and reconstructing the real world are crucial in XR/VR. Recently, 3D Gaussian Splatting (3D-GS) methods have shown remarkable success in modeling and understanding 3D scenes.

- Title: RT-GS2: Real-Time Generalizable Semantic Segmentation for 3D Gaussian Representations of Radiance Fields
  Authors: Mihnea-Bogdan Jurca, Remco Royen, Ion Giosan, Adrian Munteanu
  Year: 2024
  ArXiv: 2405.18033
  Code: https://github.com/mbjurca/RT_GS2
  Project: https://mbjurca.github.io/rt-gs2/
  Tags: Point Cloud, Transformer, Virtual Reality
  Key: Gaussian Splatting has revolutionized the world of novel view synthesis by achieving high rendering performance in real-time. Recently, studies have focused on enriching these 3D representations with

- Title: Contrastive Gaussian Clustering: Weakly Supervised 3D Scene Segmentation
  Authors: Myrna C. Silva, Mahtab Dahaghin, Matteo Toso, Alessio Del Bue
  Year: 2024
  ArXiv: 2404.12784
  Key: We introduce Contrastive Gaussian Clustering, a novel approach capable of provide segmentation masks from any viewpoint and of enabling 3D segmentation of the scene. Recent works in novel-view synthes

- Title: Gaga: Group Any Gaussians via 3D-aware Memory Bank
  Authors: Weijie Lyu, Xueting Li, Abhijit Kundu, Yi-Hsuan Tsai, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2404.07977
  Code: https://github.com/weijielyu/Gaga
  Project: https://www.gaga.gallery/
  Tags: Editing
  Key: We introduce Gaga, a framework that reconstructs and segments open-world 3D scenes by leveraging inconsistent 2D masks predicted by zero-shot segmentation models. Contrasted to prior 3D scene segmenta

- Title: Feature Splatting: Language-Driven Physics-Based Scene Synthesis and Editing
  Authors: Ri-Zhao Qiu, Ge Yang, Weijia Zeng, Xiaolong Wang
  Year: 2024
  ArXiv: 2404.01223
  Code: https://github.com/vuer-ai/feature_splatting
  Project: https://feature-splatting.github.io/
  Tags: Editing, Language Embedding, Physics
  Key: Scene representations using 3D Gaussian primitives have produced excellent results in modeling the appearance of static and dynamic 3D scenes. Many graphics applications, however, demand the ability t

- Title: EgoLifter: Open-world 3D Segmentation for Egocentric Perception
  Authors: Qiao Gu, Zhaoyang Lv, Duncan Frost, Simon Green, Julian Straub, Chris Sweeney
  Year: 2024
  ArXiv: 2403.18118
  Code: https://github.com/facebookresearch/egolifter
  Project: https://egolifter.github.io/
  Key: In this paper we present EgoLifter, a novel system that can automatically segment scenes captured from egocentric sensors into a complete decomposition of individual 3D objects. The system is specific

- Title: Semantic Gaussians: Open-Vocabulary Scene Understanding with 3D Gaussian Splatting
  Authors: Jun Guo, Xiaojian Ma, Yue Fan, Huaping Liu, Qing Li
  Year: 2024
  ArXiv: 2403.15624
  Code: https://github.com/sharinka0715/semantic-gaussians
  Project: https://semantic-gaussians.github.io/
  Tags: Language Embedding
  Key: Open-vocabulary 3D scene understanding presents a significant challenge in computer vision, withwide-ranging applications in embodied agents and augmented reality systems. Previous approaches haveadop

- Title: GaussianGrasper: 3D Language Gaussian Splatting for Open-vocabulary Robotic Grasping
  Authors: Yuhang Zheng, Xiangyu Chen, Yupeng Zheng, Songen Gu, Runyi Yang, Bu Jin, Pengfei Li, Chengliang Zhong, Zengmao Wang, Lina Liu, Chao Yang, Dawei Wang, Zhen Chen, Xiaoxiao Long, Meiqing Wang
  Year: 2024
  ArXiv: 2403.09637
  Code: https://github.com/MrSecant/GaussianGrasper
  Project: https://mrsecant.github.io/GaussianGrasper/
  Tags: Language Embedding, Robotics
  Key: Constructing a 3D scene capable of accommodating open-ended language queries, is a pivotal pursuit, particularly within the domain of robotics. Such technology facilitates robots in executing object m

- Title: Segment Anything in 3D Gaussians
  Authors: Xu Hu, Yuxi Wang, Lue Fan, Junsong Fan, Junran Peng, Zhen Lei, Qing Li, Zhaoxiang Zhang
  Year: 2024
  ArXiv: 2401.17857
  Code: https://github.com/XuHu0529/SAGS
  Key: 3D Gaussian Splatting has emerged as an alternative 3D representation of Neural Radiance Fields (NeRFs), benefiting from its high-quality rendering results and real-time rendering speed. Considering t

- Title: CoSSegGaussians: Compact and Swift Scene Segmenting 3D Gaussians
  Authors: Bin Dou, Tianyu Zhang, Yongjia Ma, Zhaohui Wang, Zejian Yuan
  Year: 2024
  ArXiv: 2401.05925
  Project: https://david-dou.github.io/CoSSegGaussians/
  Key: We propose Compact and Swift Segmenting 3D Gaussians(CoSSegGaussians), a method for compact 3D-consistent scene segmentation at fast rendering speed with only RGB images input. Previous NeRF-based 3D

- Title: FMGS: Foundation Model Embedded 3D Gaussian Splatting for Holistic 3D Scene Understanding
  Authors: Xingxing Zuo, Pouya Samangouei, Yunwen Zhou, Yan Di, Mingyang Li
  Year: 2024
  ArXiv: 2401.01970
  Code: https://github.com/google-research/foundation-model-embedded-3dgs
  Project: https://xingxingzuo.github.io/fmgs/
  Tags: Language Embedding
  Key: Precisely perceiving the geometric and semantic properties of real-world 3D objects is crucial for the continued evolution of augmented reality and robotic applications. To this end, we present \algfu

- Title: LangSplat: 3D Language Gaussian Splatting
  Authors: Minghan Qin, Wanhua Li, Jiawei Zhou, Haoqian Wang, Hanspeter Pfister
  Year: 2024
  ArXiv: 2312.16084
  Code: https://github.com/minghanqin/LangSplat
  Project: https://langsplat.github.io/
  Tags: Language Embedding
  Key: Human lives in a 3D world and commonly uses natural language to interact with a 3D scene. Modeling a 3D language field to support open-ended language queries in 3D has gained increasing attention rece

- Title: 2D-Guided 3D Gaussian Segmentation
  Authors: Kun Lan, Haoran Li, Haolin Shi, Wenjun Wu, Yong Liao, Lin Wang, Pengyuan Zhou
  Year: 2023
  ArXiv: 2312.16047
  Key: Recently, 3D Gaussian, as an explicit 3D representation method, has demonstrated strong competitiveness over NeRF (Neural Radiance Fields) in terms of expressing complex scenes and training duration.

- Title: Feature 3DGS: Supercharging 3D Gaussian Splatting to Enable Distilled Feature Fields
  Authors: Shijie Zhou, Haoran Chang, Sicheng Jiang, Zhiwen Fan, Zehao Zhu, Dejia Xu, Pradyumna Chari, Suya You, Zhangyang Wang, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.03203
  Code: https://github.com/ShijieZhou-UCLA/feature-3dgs
  Project: https://feature-3dgs.github.io/
  Tags: Editing, Inpainting, Language Embedding
  Key: 3D scene representations have gained immense popularity in recent years. Methods that use Neural Radiance fields are versatile for traditional tasks such as novel view synthesis. In recent times, some

- Title: Segment Any 3D Gaussians
  Authors: Jiazhong Cen, Jiemin Fang, Chen Yang, Lingxi Xie, Xiaopeng Zhang, Wei Shen, Qi Tian
  Year: 2023
  ArXiv: 2312.00860
  Code: https://github.com/Jumpat/SegAnyGAussians
  Project: https://jumpat.github.io/SAGA/
  Tags: Editing
  Key: Interactive 3D segmentation in radiance fields is an appealing task since its importance in 3D scene understanding and manipulation. However, existing methods face challenges in either achieving fine-

- Title: Gaussian Grouping: Segment and Edit Anything in 3D Scenes
  Authors: Mingqiao Ye, Martin Danelljan, Fisher Yu, Lei Ke
  Year: 2023
  ArXiv: 2312.00732
  Code: https://github.com/lkeab/gaussian-grouping
  Project: https://ymq2017.github.io/gaussian-grouping/
  Tags: Editing
  Key: The recent Gaussian Splatting achieves high-quality and real-time novel-view synthesis of the 3D scenes. However, it is solely concentrated on the appearance and geometry modeling, while lacking in fi

- Title: Language Embedded 3D Gaussians for Open-Vocabulary Scene Understanding
  Authors: Jin-Chuan Shi, Miao Wang, Hao-Bin Duan, Shao-Hua Guan
  Year: 2024
  ArXiv: 2311.18482
  Code: https://github.com/buaavrcg/LEGaussians
  Project: https://buaavrcg.github.io/LEGaussians/
  Tags: Language Embedding
  Key: Open-vocabulary querying in 3D space is challenging but essential for scene understanding tasks such as object localization and segmentation. Language-embedded scene representations have made progress

================================================================================
CATEGORY: Sparse (32 papers)
================================================================================

- Title: SparseSplat: Towards Applicable Feed-Forward 3D Gaussian Splatting with Pixel-Unaligned Prediction
  Authors: Zicheng Zhang, Xiangting Meng, Ke Wu, Wenchao Ding
  Year: 2026
  ArXiv: 2604.03069
  Project: https://victkk.github.io/SparseSplat-page/
  Tags: Feed-Forward
  Key: Recent progress in feed-forward 3D Gaussian Splatting (3DGS) has notably improved rendering quality. However, the spatially uniform and highly redundant 3DGS map generated by previous feed-forward 3DG

- Title: FastGS: Training 3D Gaussian Splatting in 100 Seconds
  Authors: Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu
  Year: 2025
  ArXiv: 2511.04283
  Code: https://github.com/fastgs/FastGS
  Project: https://fastgs.github.io/
  Tags: Acceleration, Densification, Dynamic
  Key: The dominant 3D Gaussian splatting (3DGS) acceleration methods fail to properly regulate the number of Gaussians during training, causing redundant computational time overhead. In this paper, we propo

- Title: Synthetic Prior for Few-Shot Drivable Head Avatar Inversion
  Authors: Wojciech Zielonka, Stephan J. Garbin, Alexandros Lattas, George Kopanas, Paulo Gotardo, Thabo Beeler, Justus Thies, Timo Bolkart
  Year: 2025
  ArXiv: 2501.06903
  Project: https://zielon.github.io/synshot/
  Tags: Avatar, Dynamic
  Key: We present SynShot, a novel method for the few-shot inversion of a drivable head avatar based on a synthetic prior. We tackle two major challenges. First, training a controllable 3D generative network

- Title: FatesGS: Fast and Accurate Sparse-View Surface Reconstruction using Gaussian Splatting with Depth-Feature Consistency
  Authors: Han Huang, Yulun Wu, Chao Deng, Ge Gao, Ming Gu, Yu-Shen Liu
  Year: 2025
  ArXiv: 2501.04628
  Project: https://alvin528.github.io/FatesGS/
  Tags: Meshing
  Key: Recently, Gaussian Splatting has sparked a new trend in the field of computer vision. Apart from novel view synthesis, it has also been extended to the area of multi-view reconstruction. The latest me

- Title: Dust to Tower: Coarse-to-Fine Photo-Realistic Scene Reconstruction from Sparse Uncalibrated Images
  Authors: Xudong Cai, Yongcai Wang, Zhaoxin Fan, Deng Haoran, Shuo Wang, Wanting Li, Deying Li, Lun Luo, Minhang Wang, Jintao Xu
  Year: 2024
  ArXiv: 2412.19518
  Tags: Inpainting, Poses
  Key: Photo-realistic scene reconstruction from sparse-view, uncalibrated images is highly required in practice. Although some successes have been made, existing methods are either Sparse-View but require a

- Title: SolidGS: Consolidating Gaussian Surfel Splatting for Sparse-View Surface Reconstruction
  Authors: Zhuowen Shen, Yuan Liu, Zhang Chen, Zhong Li, Jiepeng Wang, Yongqing Liang, Zhengming Yu, Jingdong Zhang, Yi Xu, Scott Schaefer, Xin Li, Wenping Wang
  Year: 2024
  ArXiv: 2412.15400
  Project: https://mickshen7558.github.io/projects/SolidGS/
  Tags: Meshing
  Key: Gaussian splatting has achieved impressive improvements for both novel-view synthesis and surface reconstruction from multi-view images. However, current methods still struggle to reconstruct high-qua

- Title: Real-time Free-view Human Rendering from Sparse-view RGB Videos using Double Unprojected Textures
  Authors: Guoxing Sun, Rishabh Dabral, Heming Zhu, Pascal Fua, Christian Theobalt, Marc Habermann
  Year: 2024
  ArXiv: 2412.13183
  Project: https://vcai.mpi-inf.mpg.de/projects/DUT/
  Tags: Avatar, Texturing
  Key: Real-time free-view human rendering from sparse-view RGB inputs is a challenging task due to the sensor scarcity and the tight time budget. To ensure efficiency, recent methods leverage 2D CNNs operat

- Title: Wonderland: Navigating 3D Scenes from a Single Image
  Authors: Hanwen Liang, Junli Cao, Vidit Goel, Guocheng Qian, Sergei Korolev, Demetri Terzopoulos, Konstantinos N. Plataniotis, Sergey Tulyakov, Jian Ren
  Year: 2024
  ArXiv: 2412.12091
  Project: https://snap-research.github.io/wonderland/
  Tags: Feed-Forward, World Generation
  Key: This paper addresses a challenging question: How can we efficiently create high-quality, wide-scope 3D scenes from a single arbitrary image? Existing methods face several constraints, such as requirin

- Title: MV-DUSt3R+: Single-Stage Scene Reconstruction from Sparse Views In 2 Seconds
  Authors: Zhenggang Tang, Yuchen Fan, Dilin Wang, Hongyu Xu, Rakesh Ranjan, Alexander Schwing, Zhicheng Yan
  Year: 2024
  ArXiv: 2412.06974
  Code: https://github.com/facebookresearch/mvdust3r
  Project: https://mv-dust3rp.github.io/
  Tags: 3ster-based
  Key: Recent sparse multi-view scene reconstruction advances like DUSt3R and MASt3R no longer require camera calibration and camera pose estimation. However, they only process a pair of views at a time to i

- Title: MAtCha Gaussians: Atlas of Charts for High-Quality Geometry and Photorealism From Sparse Views
  Authors: Antoine Guédon, Tomoki Ichikawa, Kohei Yamashita, Ko Nishino
  Year: 2024
  ArXiv: 2412.06767
  Project: https://anttwo.github.io/matcha/
  Tags: Meshing
  Key: We present a novel appearance model that simultaneously realizes explicit high-quality 3D surface mesh recovery and photorealistic novel view synthesis from sparse view samples. Our key idea is to mod

- Title: Sparse Voxels Rasterization: Real-time High-fidelity Radiance Field Rendering
  Authors: Cheng Sun, Jaesung Choe, Charles Loop, Wei-Chiu Ma, Yu-Chiang Frank Wang
  Year: 2024
  ArXiv: 2412.04459
  Code: https://github.com/NVlabs/svraster
  Project: https://svraster.github.io/
  Tags: Rendering
  Key: We propose an efficient radiance field rendering algorithm that incorporates a rasterization process on sparse voxels without neural networks or 3D Gaussians. There are two key contributions coupled w

- Title: Speedy-Splat: Fast 3D Gaussian Splatting with Sparse Pixels and Sparse Primitives
  Authors: Alex Hanson, Allen Tu, Geng Lin, Vasu Singla, Matthias Zwicker, Tom Goldstein
  Year: 2024
  ArXiv: 2412.00578
  Tags: Acceleration
  Key: 3D Gaussian Splatting (3D-GS) is a recent 3D scene reconstruction technique that enables real-time rendering of novel views by modeling scenes as parametric point clouds of differentiable 3D Gaussians

- Title: SPARS3R: Semantic Prior Alignment and Regularization for Sparse 3D Reconstruction
  Authors: Yutao Tang, Yuxiang Guo, Deming Li, Cheng Peng
  Year: 2024
  ArXiv: 2411.12592
  Tags: 3ster-based, Poses
  Key: Recent efforts in Gaussian-Splat-based Novel View Synthesis can achieve photorealistic rendering; however, such capability is limited in sparse-view scenarios due to sparse initialization and over-fit

- Title: HiSplat: Hierarchical 3D Gaussian Splatting for Generalizable Sparse-View Reconstruction
  Authors: Shengji Tang, Weicai Ye, Peng Ye, Weihao Lin, Yang Zhou, Tao Chen, Wanli Ouyang
  Year: 2024
  ArXiv: 2410.06245
  Code: https://github.com/Open3DVLab/HiSplat
  Project: https://open3dvlab.github.io/HiSplat/
  Tags: Feed-Forward
  Key: Reconstructing 3D scenes from multiple viewpoints is a fundamental task in stereo vision. Recently, advances in generalizable 3D Gaussian Splatting have enabled high-quality novel view synthesis for u

- Title: MonST3R: A Simple Approach for Estimating Geometry in the Presence of Motion
  Authors: Junyi Zhang, Charles Herrmann, Junhwa Hur, Varun Jampani, Trevor Darrell, Forrester Cole, Deqing Sun, Ming-Hsuan Yang
  Year: 2024
  ArXiv: 2410.03825
  Code: https://github.com/Junyi42/monst3r
  Project: https://monst3r-project.github.io/
  Tags: 3ster-based, Dynamic
  Key: Estimating geometry from dynamic scenes, where objects move and deform over time, remains a core challenge in computer vision. Current approaches often rely on multi-stage pipelines or global optimiza

- Title: SplatFields: Neural Gaussian Splats for Sparse 3D and 4D Reconstruction
  Authors: Marko Mihajlovic, Sergey Prokudin, Siyu Tang, Robert Maier, Federica Bogo, Tony Tung, Edmond Boyer
  Year: 2024
  ArXiv: 2409.11211
  Code: https://github.com/markomih/SplatFields
  Project: https://markomih.github.io/SplatFields/
  Key: Digitizing 3D static scenes and 4D dynamic events from multi-view images has long been a challenge in computer vision and graphics. Recently, 3D Gaussian Splatting (3DGS) has emerged as a practical an

- Title: TranSplat: Generalizable 3D Gaussian Splatting from Sparse Multi-View Images with Transformers
  Authors: Chuanrui Zhang, Yingshuang Zou, Zhuoling Li, Minmin Yi, Haoqian Wang
  Year: 2024
  ArXiv: 2408.13770
  Code: https://github.com/xingyoujun/transplat
  Project: https://xingyoujun.github.io/transplat/
  Tags: Feed-Forward, Transformer
  Key: Compared with previous 3D reconstruction methods like Nerf, recent Generalizable 3D Gaussian Splatting (G-3DGS) methods demonstrate impressive efficiency even in the sparse-view setting. However, the

- Title: Sp<sup>2</sup>360: Sparse-view 360 Scene Reconstruction using Cascaded 2D Diffusion Priors
  Authors: Soumava Paul, Christopher Wewer, Bernt Schiele, Jan Eric Lenssen
  Year: 2024
  ArXiv: 2405.16517
  Code: https://github.com/mvp18/sp2-360
  Key: We aim to tackle sparse-view reconstruction of a 360 3D scene using priors from latent diffusion models (LDM). The sparse-view setting is ill-posed and underconstrained, especially for scenes where th

- Title: InstantSplat: Unbounded Sparse-view Pose-free Gaussian Splatting in 40 Seconds
  Authors: Zhiwen Fan, Wenyan Cong, Kairun Wen, Kevin Wang, Jian Zhang, Xinghao Ding, Danfei Xu, Boris Ivanovic, Marco Pavone, Georgios Pavlakos, Zhangyang Wang, Yue Wang
  Year: 2024
  ArXiv: 2403.20309
  Code: https://github.com/NVlabs/InstantSplat
  Project: https://instantsplat.github.io/
  Key: While novel view synthesis (NVS) has made substantial progress in 3D computer vision, it typically requires an initial estimation of camera intrinsics and extrinsics from dense viewpoints. This pre-pr

- Title: SGD: Street View Synthesis with Gaussian Splatting and Diffusion Prior
  Authors: Zhongrui Yu, Haoran Wang, Jinze Yang, Hanzhang Wang, Zeke Xie, Yunfeng Cai, Jiale Cao, Zhong Ji, Mingming Sun
  Year: 2024
  ArXiv: 2403.20079
  Tags: Diffusion, Lidar
  Key: Novel View Synthesis (NVS) for street scenes play a critical role in the autonomous driving simulation. The current mainstream technique to achieve it is neural rendering, such as Neural Radiance Fiel

- Title: CoherentGS: Sparse Novel View Synthesis with Coherent 3D Gaussians
  Authors: Avinash Paliwal, Wei Ye, Jinhui Xiong, Dmytro Kotovenko, Rakesh Ranjan, Vikas Chandra, Nima Khademi Kalantari
  Year: 2024
  ArXiv: 2403.19495
  Code: https://github.com/avinashpaliwal/CoherentGS
  Project: https://people.engr.tamu.edu/nimak/Papers/CoherentGS/index.html
  Key: The field of 3D reconstruction from images has rapidly evolved in the past few years, first with the introduction of Neural Radiance Field (NeRF) and more recently with 3D Gaussian Splatting (3DGS). T

- Title: Gamba: Marry Gaussian Splatting with Mamba for single view 3D reconstruction
  Authors: Qiuhong Shen, Xuanyu Yi, Zike Wu, Pan Zhou, Hanwang Zhang, Shuicheng Yan, Xinchao Wang
  Year: 2024
  ArXiv: 2403.18795
  Code: https://github.com/SkyworkAI/Gamba
  Project: https://florinshen.github.io/gamba-project/
  Tags: Feed-Forward
  Key: We tackle the challenge of efficiently reconstructing a 3D asset from a single image with growing demands for automated 3D content creation pipelines. Previous methods primarily rely on Score Distilla

- Title: latentSplat: Autoencoding Variational Gaussians for Fast Generalizable 3D Reconstruction
  Authors: Christopher Wewer, Kevin Raj, Eddy Ilg, Bernt Schiele, Jan Eric Lenssen
  Year: 2024
  ArXiv: 2403.16292
  Code: https://github.com/Chrixtar/latentsplat
  Project: https://geometric-rl.mpi-inf.mpg.de/latentsplat/
  Tags: Feed-Forward
  Key: We present latentSplat, a method to predict semantic Gaussians in a 3D latent space that can be splatted and decoded by a light-weight generative 2D architecture. Existing methods for generalizable 3D

- Title: MVSplat: Efficient 3D Gaussian Splatting from Sparse Multi-View Images
  Authors: Yuedong Chen, Haofei Xu, Chuanxia Zheng, Bohan Zhuang, Marc Pollefeys, Andreas Geiger, Tat-Jen Cham, Jianfei Cai
  Year: 2024
  ArXiv: 2403.14627
  Code: https://github.com/donydchen/mvsplat
  Project: https://donydchen.github.io/mvsplat/
  Tags: Feed-Forward
  Key: We propose MVSplat, an efficient feed-forward 3D Gaussian Splatting model learned from sparse multi-view images. To accurately localize the Gaussian centers, we propose to build a cost volume represen

- Title: GRM: Large Gaussian Reconstruction Model for Efficient 3D Reconstruction and Generation
  Authors: Yinghao Xu, Zifan Shi, Wang Yifan, Hansheng Chen, Ceyuan Yang, Sida Peng, Yujun Shen, Gordon Wetzstein
  Year: 2024
  ArXiv: 2403.14621
  Project: https://justimyhxu.github.io/projects/grm/
  Key: We introduce GRM, a large-scale reconstructor capable of recovering a 3D asset from sparse-view images in around 0.1s. GRM is a feed-forward transformer-based model that efficiently incorporates multi

- Title: Touch-GS: Visual-Tactile Supervised 3D Gaussian Splatting
  Authors: Aiden Swann, Matthew Strong, Won Kyung Do, Gadiel Sznaier Camps, Mac Schwager, Monroe Kennedy III
  Year: 2024
  ArXiv: 2403.09875
  Code: https://github.com/armlabstanford/Touch-GS
  Project: https://armlabstanford.github.io/touch-gs
  Tags: Rendering, Robotics
  Key: In this work, we propose a novel method to supervise 3D Gaussian Splatting (3DGS) scenes using optical tactile sensors. Optical tactile sensors have become widespread in their use in robotics for mani

- Title: DNGaussian: Optimizing Sparse-View 3D Gaussian Radiance Fields with Global-Local Depth Normalization
  Authors: Jiahe Li, Jiawei Zhang, Xiao Bai, Jin Zheng, Xin Ning, Jun Zhou, Lin Gu
  Year: 2024
  ArXiv: 2403.06912
  Code: https://github.com/Fictionarry/DNGaussian
  Project: https://fictionarry.github.io/DNGaussian/
  Key: Radiance fields have demonstrated impressive performance in synthesizing novel views from sparse input views, yet prevailing methods suffer from high training costs and slow inference speed. This pape

- Title: Splatter Image: Ultra-Fast Single-View 3D Reconstruction
  Authors: Stanislaw Szymanowicz, Christian Rupprecht, Andrea Vedaldi
  Year: 2023
  ArXiv: 2312.13150
  Code: https://github.com/szymanowiczs/splatter-image
  Project: https://szymanowiczs.github.io/splatter-image.html
  Tags: Feed-Forward
  Key: We introduce the Splatter Image, an ultra-fast approach for monocular 3D object reconstruction which operates at 38 FPS. Splatter Image is based on Gaussian Splatting, which has recently brought real-

- Title: pixelSplat: 3D Gaussian Splats from Image Pairs for Scalable Generalizable 3D Reconstruction
  Authors: David Charatan, Sizhe Li, Andrea Tagliasacchi, Vincent Sitzmann
  Year: 2023
  ArXiv: 2312.12337
  Code: https://github.com/dcharatan/pixelsplat
  Project: https://davidcharatan.com/pixelsplat/
  Tags: Feed-Forward
  Key: We introduce pixelSplat, a feed-forward model that learns to reconstruct 3D radiance fields parameterized by 3D Gaussian primitives from pairs of images. Our model features real-time and memory-effici

- Title: FSGS: Real-Time Few-shot View Synthesis using Gaussian Splatting
  Authors: Zehao Zhu, Zhiwen Fan, Yifan Jiang, Zhangyang Wang
  Year: 2023
  ArXiv: 2312.00451
  Code: https://github.com/VITA-Group/FSGS
  Project: https://zehaozhu.github.io/FSGS/
  Key: Novel view synthesis from limited observations remains an important and persistent task. However, high efficiency in existing NeRF-based few-shot view synthesis is often compromised to obtain an accur

- Title: SparseGS: Real-Time 360° Sparse View Synthesis using Gaussian Splatting
  Authors: Haolin Xiong, Sairisheek Muttukuru, Rishi Upadhyay, Pradyumna Chari, Achuta Kadambi
  Year: 2023
  ArXiv: 2312.00206
  Code: https://github.com/ForMyCat/SparseGS
  Project: https://formycat.github.io/SparseGS-Real-Time-360-Sparse-View-Synthesis-using-Gaussian-Splatting/
  Tags: 360 degree
  Key: The problem of novel view synthesis has grown significantly in popularity recently with the introduction of Neural Radiance Fields (NeRFs) and other implicit scene representation methods. A recent adv

- Title: Depth-Regularized Optimization for 3D Gaussian Splatting in Few-Shot Images
  Authors: Jaeyoung Chung, Jeongtaek Oh, Kyoung Mu Lee
  Year: 2023
  ArXiv: 2311.13398
  Code: https://github.com/robot0321/DepthRegularizedGS
  Project: https://robot0321.github.io/DepthRegGS/index.html
  Key: In this paper, we present a method to optimize Gaussian splatting with a limited number of images while avoiding overfitting. Representing a 3D scene by combining numerous Gaussian splats has yielded

================================================================================
CATEGORY: Stereo (2 papers)
================================================================================

- Title: Self-Evolving Depth-Supervised 3D Gaussian Splatting from Rendered Stereo Pairs
  Authors: Sadra Safadoust, Fabio Tosi, Fatma Güney, Matteo Poggi
  Year: 2024
  ArXiv: 2409.07456
  Code: https://github.com/sadrasafa/StereoGS
  Project: https://kuis-ai.github.io/StereoGS/
  Key: 3D Gaussian Splatting (GS) significantly struggles to accurately represent the underlying 3D scene geometry, resulting in inaccuracies and floating artifacts when rendering depth maps. In this paper,

- Title: GS2Mesh: Surface Reconstruction from Gaussian Splatting via Novel Stereo Views
  Authors: Yaniv Wolf, Amit Bracha, Ron Kimmel
  Year: 2024
  ArXiv: 2404.01810
  Code: https://github.com/yanivw12/gs2mesh
  Project: https://gs2mesh.github.io//
  Tags: 2DGS, Meshing
  Key: Recently, 3D Gaussian Splatting (3DGS) has emerged as an efficient approach for accurately representing scenes. However, despite its superior novel view synthesis capabilities, extracting the geometry

================================================================================
CATEGORY: Style Transfer (6 papers)
================================================================================

- Title: CLIPGaussian: Universal and Multimodal Style Transfer Based on Gaussian Splatting
  Authors: Kornel Howil, Joanna Waczyńska, Piotr Borycki, Tadeusz Dziarmaga, Marcin Mazur, Przemysław Spurek
  Year: 2025
  ArXiv: 2505.22854
  Code:  https://github.com/kornelhowil/CLIPGaussian
  Project: https://kornelhowil.github.io/CLIPGaussian/
  Key: Gaussian Splatting (GS) has recently emerged as an efficient representation for rendering 3D scenes from 2D images and has been extended to images, videos, and dynamic 4D content. However, applying st

- Title: ABC-GS: Alignment-Based Controllable Style Transfer for 3D Gaussian Splatting
  Authors: Wenjie Liu, Zhongliang Liu, Xiaoyan Yang, Man Sha, Yang Li
  Year: 2025
  ArXiv: 2503.22218
  Code: https://github.com/vpx-ecnu/ABC-GS
  Project: https://vpx-ecnu.github.io/ABC-GS-website/
  Key: 3D scene stylization approaches based on Neural Radiance Fields (NeRF) achieve promising results by optimizing with Nearest Neighbor Feature Matching (NNFM) loss. However, NNFM loss does not consider

- Title: Diffusion-Based Attention Warping for Consistent 3D Scene Editing
  Authors: Eyal Gomel, Lior Wolf
  Year: 2024
  ArXiv: 2412.07984
  Project: https://attention-warp.github.io/
  Tags: Diffusion
  Key: We present a novel method for 3D scene editing using diffusion models, designed to ensure view consistency and realism across perspectives. Our approach leverages attention features extracted from a s

- Title: StylizedGS: Controllable Stylization for 3D Gaussian Splatting
  Authors: Dingxi Zhang, Zhuoxun Chen, Yu-Jie Yuan, Fang-Lue Zhang, Zhenliang He, Shiguang Shan, Lin Gao
  Year: 2024
  ArXiv: 2404.05220
  Tags: Rendering
  Key: With the rapid development of XR, 3D generation and editing are becoming more and more important, among which, stylization is an important tool of 3D appearance editing. It can achieve consistent 3D a

- Title: Gaussian Splatting in Style
  Authors: Abhishek Saroha, Mariia Gladkova, Cecilia Curreli, Tarun Yenamandra, Daniel Cremers
  Year: 2024
  ArXiv: 2403.08498
  Key: Scene stylization extends the work of neural style transfer to three spatial dimensions. A vital challenge in this problem is to maintain the uniformity of the stylized appearance across a multi-view

- Title: StyleGaussian: Instant 3D Style Transfer with Gaussian Splatting
  Authors: Kunhao Liu, Fangneng Zhan, Muyu Xu, Christian Theobalt, Ling Shao, Shijian Lu
  Year: 2024
  ArXiv: 2403.07807
  Code: https://github.com/Kunhao-Liu/StyleGaussian
  Project: https://kunhao-liu.github.io/StyleGaussian/
  Key: We introduce StyleGaussian, a novel 3D style transfer technique that allows instant transfer of any image's style to a 3D scene at 10 frames per second (fps). Leveraging 3D Gaussian Splatting (3DGS),

================================================================================
CATEGORY: Super Resolution (1 papers)
================================================================================

- Title: Generalized and Efficient 2D Gaussian Splatting for Arbitrary-scale Super-Resolution
  Authors: Du Chen, Liyi Chen, Zhengqiang Zhang, Lei Zhang
  Year: 2025
  ArXiv: 2501.06838
  Project: https://mt-cly.github.io/GSASR.github.io/
  Key: Equipped with the continuous representation capability of Multi-Layer Perceptron (MLP), Implicit Neural Representation (INR) has been successfully employed for Arbitrary-scale Super-Resolution (ASR).

================================================================================
CATEGORY: Texturing (7 papers)
================================================================================

- Title: Real-time Free-view Human Rendering from Sparse-view RGB Videos using Double Unprojected Textures
  Authors: Guoxing Sun, Rishabh Dabral, Heming Zhu, Pascal Fua, Christian Theobalt, Marc Habermann
  Year: 2024
  ArXiv: 2412.13183
  Project: https://vcai.mpi-inf.mpg.de/projects/DUT/
  Tags: Avatar, Sparse
  Key: Real-time free-view human rendering from sparse-view RGB inputs is a challenging task due to the sensor scarcity and the tight time budget. To ensure efficiency, recent methods leverage 2D CNNs operat

- Title: Gaussian Billboards: Expressive 2D Gaussian Splatting with Textures
  Authors: Sebastian Weiss, Derek Bradley
  Year: 2024
  ArXiv: 2412.12734
  Tags: 2DGS
  Key: Gaussian Splatting has recently emerged as the go-to representation for reconstructing and rendering 3D scenes. The transition from 3D to 2D Gaussian primitives has further improved multi-view consist

- Title: Textured Gaussians for Enhanced 3D Scene Appearance Modeling
  Authors: Brian Chao, Hung-Yu Tseng, Lorenzo Porzi, Chen Gao, Tuotuo Li, Qinbo Li, Ayush Saraf, Jia-Bin Huang, Johannes Kopf, Gordon Wetzstein, Changil Kim
  Year: 2024
  ArXiv: 2411.18625
  Project: https://textured-gaussians.github.io/
  Tags: In the Wild, Rendering
  Key: 3D Gaussian Splatting (3DGS) has recently emerged as a state-of-the-art 3D reconstruction and rendering technique due to its high-quality results and fast training and rendering time. However, pixels

- Title: FATE: Full-head Gaussian Avatar with Textural Editing from Monocular Video
  Authors: Jiawei Zhang, Zijian Wu, Zhiyang Liang, Yicheng Gong, Dongfang Hu, Yao Yao, Xun Cao, Hao Zhu
  Year: 2024
  ArXiv: 2411.15604
  Code: https://github.com/zjwfufu/FateAvatar
  Project: https://zjwfufu.github.io/FATE-page/
  Tags: Avatar, Dynamic, Editing, Monocular
  Key: Reconstructing high-fidelity, animatable 3D head avatars from effortlessly captured monocular videos is a pivotal yet formidable challenge. Although significant progress has been made in rendering per

- Title: BillBoard Splatting (BBSplat): Learnable Textured Primitives for Novel View Synthesis
  Authors: David Svitov, Pietro Morerio, Lourdes Agapito, Alessio Del Bue
  Year: 2024
  ArXiv: 2411.08508
  Code: https://github.com/david-svitov/BBSplat
  Project: https://david-svitov.github.io/BBSplat_project_page/
  Tags: Optimization
  Key: We present billboard Splatting (BBSplat) - a novel approach for 3D scene representation based on textured geometric primitives. BBSplat represents the scene as a set of optimizable textured planar pri

- Title: GarmentDreamer: 3DGS Guided Garment Synthesis with Diverse Geometry and Texture Details
  Authors: Boqian Li, Xuan Li, Ying Jiang, Tianyi Xie, Feng Gao, Huamin Wang, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2405.12420
  Code: https://github.com/boqian-li/GarmentDreamer
  Project: https://xuan-li.github.io/GarmentDreamerDemo/
  Tags: Avatar, Dynamic, Rendering
  Key: Traditional 3D garment creation is labor-intensive, involving sketching, modeling, UV mapping, and texturing, which are time-consuming and costly. Recent advances in diffusion-based generative models

- Title: Texture-GS: Disentangling the Geometry and Texture for 3D Gaussian Splatting Editing
  Authors: Tian-Xing Xu, Wenbo Hu, Yu-Kun Lai, Ying Shan, Song-Hai Zhang
  Year: 2024
  ArXiv: 2403.10050
  Code: https://github.com/slothfulxtx/Texture-GS
  Project: https://slothfulxtx.github.io/TexGS/
  Tags: Editing
  Key: 3D Gaussian splatting, emerging as a groundbreaking approach, has drawn increasing attention for its capabilities of high-fidelity reconstruction and real-time rendering. However, it couples the appea

================================================================================
CATEGORY: Transformer (5 papers)
================================================================================

- Title: Gaussian Masked Autoencoders
  Authors: Jathushan Rajasegaran, Xinlei Chen, Rulilong Li, Christoph Feichtenhofer, Jitendra Malik, Shiry Ginosar
  Year: 2025
  ArXiv: 2501.03229
  Code: https://github.com/darshanmakwana412/gaussian-mae
  Key: This paper explores Masked Autoencoders (MAE) with Gaussian Splatting. While reconstructive self-supervised learning frameworks such as MAE learns good semantic abstractions, it is not trained for exp

- Title: Generating 3D-Consistent Videos from Unposed Internet Photos
  Authors: Gene Chou, Kai Zhang, Sai Bi, Hao Tan, Zexiang Xu, Fujun Luan, Bharath Hariharan, Noah Snavely
  Year: 2024
  ArXiv: 2411.13549
  Project: https://genechou.com/kfcw/
  Tags: Feed-Forward, In the Wild, Poses
  Key: We address the problem of generating videos from unposed internet photos. A handful of input images serve as keyframes, and our model interpolates between them to simulate a path moving between the ca

- Title: TranSplat: Generalizable 3D Gaussian Splatting from Sparse Multi-View Images with Transformers
  Authors: Chuanrui Zhang, Yingshuang Zou, Zhuoling Li, Minmin Yi, Haoqian Wang
  Year: 2024
  ArXiv: 2408.13770
  Code: https://github.com/xingyoujun/transplat
  Project: https://xingyoujun.github.io/transplat/
  Tags: Feed-Forward, Sparse
  Key: Compared with previous 3D reconstruction methods like Nerf, recent Generalizable 3D Gaussian Splatting (G-3DGS) methods demonstrate impressive efficiency even in the sparse-view setting. However, the

- Title: RT-GS2: Real-Time Generalizable Semantic Segmentation for 3D Gaussian Representations of Radiance Fields
  Authors: Mihnea-Bogdan Jurca, Remco Royen, Ion Giosan, Adrian Munteanu
  Year: 2024
  ArXiv: 2405.18033
  Code: https://github.com/mbjurca/RT_GS2
  Project: https://mbjurca.github.io/rt-gs2/
  Tags: Point Cloud, Segmentation, Virtual Reality
  Key: Gaussian Splatting has revolutionized the world of novel view synthesis by achieving high rendering performance in real-time. Recently, studies have focused on enriching these 3D representations with

- Title: Triplane Meets Gaussian Splatting: Fast and Generalizable Single-View 3D Reconstruction with Transformers
  Authors: Zi-Xin Zou, Zhipeng Yu, Yuan-Chen Guo, Yangguang Li, Ding Liang, Yan-Pei Cao, Song-Hai Zhang
  Year: 2023
  ArXiv: 2312.09147
  Code: https://github.com/VAST-AI-Research/TriplaneGaussian
  Project: https://zouzx.github.io/TriplaneGaussian/
  Tags: Misc
  Key: Recent advancements in 3D reconstruction from single images have been driven by the evolution of generative models. Prominent among these are methods based on Score Distillation Sampling (SDS) and the

================================================================================
CATEGORY: Uncertainty (4 papers)
================================================================================

- Title: WarpRF: Multi-View Consistency for Training-Free Uncertainty Quantification and Applications in Radiance Fields
  Authors: Sadra Safadoust, Fabio Tosi, Fatma Güney, Matteo Poggi
  Year: 2025
  ArXiv: 2506.22433
  Code: https://github.com/sadrasafa/WarpRF/
  Project: https://kuis-ai.github.io/WarpRF/
  Key: We introduce WarpRF, a training-free general-purpose framework for quantifying the uncertainty of radiance fields. Built upon the assumption that photometric and geometric consistency should hold amon

- Title: Modeling uncertainty for Gaussian Splatting
  Authors: Luca Savant, Diego Valsesia, Enrico Magli
  Year: 2024
  ArXiv: 2403.18476
  Key: We present Stochastic Gaussian Splatting (SGS): the first framework for uncertainty estimation using Gaussian Splatting (GS). GS recently advanced the novel-view synthesis field by achieving impressiv

- Title: Beyond Uncertainty: Risk-Aware Active View Acquisition for Safe Robot Navigation and 3D Scene Understanding with FisherRF
  Authors: Guangyi Liu, Wen Jiang, Boshu Lei, Vivek Pandey, Kostas Daniilidis, Nader Motee
  Year: 2024
  ArXiv: 2403.11396
  Tags: Autonomous Driving, Robotics
  Key: This work proposes a novel approach to bolster both the robot's risk assessment and safety measures while deepening its understanding of 3D scenes, which is achieved by leveraging Radiance Field (RF)

- Title: FisherRF: Active View Selection and Uncertainty Quantification for Radiance Fields using Fisher Information
  Authors: Wen Jiang, Boshu Lei, Kostas Daniilidis
  Year: 2023
  ArXiv: 2311.17874
  Code: https://github.com/JiangWenPL/FisherRF
  Project: https://jiangwenpl.github.io/FisherRF/
  Tags: Misc
  Key: This study addresses the challenging problem of active view selection and uncertainty quantification within the domain of Radiance Fields. Neural Radiance Fields (NeRF) have greatly advanced image ren

================================================================================
CATEGORY: Virtual Reality (5 papers)
================================================================================

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Diffusion, Dynamic, Feed-Forward, Gaussian Video, World Generation
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: Lifting by Gaussians: A Simple, Fast and Flexible Method for 3D Instance Segmentation
  Authors: Rohan Chacko, Nicolai Haeni, Eldar Khaliullin, Lin Sun, Douglas Lee
  Year: 2025
  ArXiv: 2502.00173
  Tags: Language Embedding, Segmentation
  Key: We introduce Lifting By Gaussians (LBG), a novel approach for open-world instance segmentation of 3D Gaussian Splatted Radiance Fields (3DGS). Recently, 3DGS Fields have emerged as a highly efficient

- Title: RT-GS2: Real-Time Generalizable Semantic Segmentation for 3D Gaussian Representations of Radiance Fields
  Authors: Mihnea-Bogdan Jurca, Remco Royen, Ion Giosan, Adrian Munteanu
  Year: 2024
  ArXiv: 2405.18033
  Code: https://github.com/mbjurca/RT_GS2
  Project: https://mbjurca.github.io/rt-gs2/
  Tags: Point Cloud, Segmentation, Transformer
  Key: Gaussian Splatting has revolutionized the world of novel view synthesis by achieving high rendering performance in real-time. Recently, studies have focused on enriching these 3D representations with

- Title: Den-SOFT: Dense Space-Oriented Light Field DataseT for 6-DOF Immersive Experience
  Authors: Xiaohang Yu, Zhengxian Yang, Shi Pan, Yuqi Han, Haoxiang Wang, Jun Zhang, Shi Yan, Borong Lin, Lei Yang, Tao Yu, Lu Fang
  Year: 2024
  ArXiv: 2403.09973
  Project: https://metaverse-ai-lab-thu.github.io/Den-SOFT/
  Key: We have built a custom mobile multi-camera large-space dense light field capture system, which provides a series of high-quality and sufficiently dense light field images for various scenarios. Our ai

- Title: VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality
  Authors: Ying Jiang, Chang Yu, Tianyi Xie, Xuan Li, Yutao Feng, Huamin Wang, Minchen Li, Henry Lau, Feng Gao, Yin Yang, Chenfanfu Jiang
  Year: 2024
  ArXiv: 2401.16663
  Project: https://yingjiang96.github.io/VR-GS/
  Tags: Meshing, Physics
  Key: As consumer Virtual Reality (VR) and Mixed Reality (MR) technologies gain momentum, there's a growing focus on the development of engagements with 3D virtual content. Unfortunately, traditional techni

================================================================================
CATEGORY: World Generation (7 papers)
================================================================================

- Title: Diff4Splat: Controllable 4D Scene Generation with Latent Dynamic Reconstruction Models
  Authors: Panwang Pan, Chenguo Lin, Jingjing Zhao, Chenxin Li, Yuchen Lin, Haopeng Li, Honglei Yan, Kairun Wen, Yunlong Lin, Yixuan Yuan, Yadong Mu
  Year: 2025
  ArXiv: 2511.00503
  Code: https://github.com/paulpanwang/Diff4Splat
  Project: https://paulpanwang.github.io/Diff4Splat/
  Tags: Diffusion, Dynamic, Feed-Forward, Gaussian Video, Virtual Reality
  Key: We introduce Diff4Splat, a feed-forward method that synthesizes controllable and explicit 4D scenes from a single image. Our approach unifies the generative priors of video diffusion models with geome

- Title: Interactive Scene Authoring with Specialized Generative Primitives
  Authors: Clément Jambon, Changwoon Choi, Dongsu Zhang, Olga Sorkine-Hornung, Young Min Kim
  Year: 2024
  ArXiv: 2412.16253
  Tags: Editing
  Key: Generating high-quality 3D digital assets often requires expert knowledge of complex design tools. We introduce Specialized Generative Primitives, a generative framework that allows non-expert users t

- Title: PanSplat: 4K Panorama Synthesis with Feed-Forward Gaussian Splatting
  Authors: Cheng Zhang, Haofei Xu, Qianyi Wu, Camilo Cruz Gambardella, Dinh Phung, Jianfei Cai
  Year: 2024
  ArXiv: 2412.12096
  Code: https://github.com/chengzhag/PanSplat
  Project: https://chengzhag.github.io/publication/pansplat/
  Tags: 360 degree, Feed-Forward
  Key: With the advent of portable 360{\deg} cameras, panorama has gained significant attention in applications like virtual reality (VR), virtual tours, robotics, and autonomous driving. As a result, wide-b

- Title: Wonderland: Navigating 3D Scenes from a Single Image
  Authors: Hanwen Liang, Junli Cao, Vidit Goel, Guocheng Qian, Sergei Korolev, Demetri Terzopoulos, Konstantinos N. Plataniotis, Sergey Tulyakov, Jian Ren
  Year: 2024
  ArXiv: 2412.12091
  Project: https://snap-research.github.io/wonderland/
  Tags: Feed-Forward, Sparse
  Key: This paper addresses a challenging question: How can we efficiently create high-quality, wide-scope 3D scenes from a single arbitrary image? Existing methods face several constraints, such as requirin

- Title: Feat2GS: Probing Visual Foundation Models with Gaussian Splatting
  Authors: Yue Chen, Xingyu Chen, Anpei Chen, Gerard Pons-Moll, Yuliang Xiu
  Year: 2024
  ArXiv: 2412.09606
  Project: https://fanegg.github.io/Feat2GS/
  Tags: Rendering
  Key: Given that visual foundation models (VFMs) are trained on extensive datasets but often limited to 2D images, a natural question arises: how well do they understand the 3D world? With the differences i

- Title: Text2Immersion: Generative Immersive Scene with 3D Gaussian
  Authors: Hao Ouyang, Kathryn Heal, Stephen Lombardi, Tiancheng Sun
  Year: 2023
  ArXiv: 2312.09242
  Project: https://ken-ouyang.github.io/text2immersion/index.html
  Tags: Diffusion
  Key: We introduce Text2Immersion, an elegant method for producing high-quality 3D immersive scenes from text prompts. Our proposed pipeline initiates by progressively generating a Gaussian cloud using pre-

- Title: LucidDreamer: Domain-free Generation of 3D Gaussian Splatting Scenes
  Authors: Jaeyoung Chung, Suyoung Lee, Hyeongjin Nam, Jaerin Lee, Kyoung Mu Lee
  Year: 2023
  ArXiv: 2311.13384
  Code: https://github.com/luciddreamer-cvlab/LucidDreamer?tab=readme-ov-file
  Project: https://luciddreamer-cvlab.github.io/
  Tags: Diffusion
  Key: With the widespread usage of VR devices and contents, demands for 3D scene generation techniques become more popular. Existing 3D scene generation models, however, limit the target scene to specific d