     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{url("myStyle/myStyle.css")}}">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="stylesheet" href="{{ asset('/css/holboos.css') }}" />
{{-- <link rel="stylesheet" href="{{ asset('/css/posts/bootstrap.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/posts/bootstrap.min.css') }}" /> --}}
<link rel="stylesheet" href="{{ asset('/css/posts/owl.carousel.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/posts/temp.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/imageShowTool/photo-show-style.css') }}" />
    <title> ЭНХИЙГ ДЭМЖИХ АЖИЛЛАГАА</title>
</head>
<body>
    <section>
        <div class="wrap">
            <div class="container">
                <div class="row justify-content-between">
                        {{-- <div class="col">
                            <p class="mb-0 phone"><span class="fa fa-phone"></span> <a href="#">(976) 51-261636</a></p>
                        </div> --}}
                        <div class="col d-flex justify-content-end">
                            <div class="social-media">
                            <p class="mb-0 d-flex">

                                <a href="/login" class="d-flex align-items-center justify-content-center" target="_blank"><span class="fa fa-sign-in" > <i class="sr-only" >НЭВТРЭХ</i></span></a>
                            </p>
                    </div>
                        </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div class="container">
                <img src="{{url("images/12.gif")}}" alt="LOGO" style="width: 100px;">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="fa fa-bars"></span> Menu
            </button>
                <div class="collapse navbar-collapse" id="ftco-nav">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item active home"><a href="{{url("./")}}" class="nav-link">НҮҮР</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle active" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">БИДНИЙ ТҮҮХ</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <a class="dropdown-item" href="{{url("/first")}}">АНХДАГЧ НАР</a>
                                <a class="dropdown-item" href="{{url("/baharhal")}}">БИДНИЙ БАХАРХАЛ</a>
                                <a class="dropdown-item" href="{{url("/womens")}}">ЭМЭГТЭЙЧҮҮД</a>
                            </div>
                        </li>
                           <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle active" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">МЭДЭЭ,МЭДЭЭЛЭЛ</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <a class="dropdown-item" href="{{url("/noob/news")}}">НҮБ-ЫН МЭДЭЭЛЭЛ</a>
                                <a class="dropdown-item" href="{{url("/see/image")}}">ЗУРГИЙН ЦОМОГ</a>

                            </div>
                        </li>
                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle active" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ЦЭРГИЙН ХАМТЫН АЖИЛЛАГАА</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <a class="dropdown-item" href="{{url("/king")}}">ХААНЫ ЭРЭЛД</a>
                                <a class="dropdown-item" href="{{url("/selenge")}}">СЭЛЭНГЭ</a>
                                <a class="dropdown-item" href="{{url("/ten")}}">АРРАВТ</a>
                                <a class="dropdown-item" href="{{url("/active")}}">ИДЭВХТЭЙ АЖИЛЛАГАА</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>

    <br>
<div class="container">

    <div class="row justify-content-center">

        <div class="col-md-12" id="post-data">
            <div class="card" style="height: 900px;     border-radius: 20px;
            display: flex;
            box-shadow: 0 0 20px 6px #242524;
            justify-content: space-between;">
            <br>
                <div class="card-body" style="overflow-y: auto;">
                    @include("aravt.info")
                </div>
            </div>
        </div>
    </div>
</div>
<br>
    {{-- Footer start --}}
    <footer class="page-footer font-small blue pt-4" style="margin-bottom: 20px">
        <div class="container-fluid text-center text-md-left">
            <div class="row">
                <div class="col-md-2 col-3  mt-3">
                    <h6 class="foot1 text-uppercase" style="text-align: center; color:white; text-shadow:0 0 20px black"><a href="http://mod.gov.mn/en/" target="_blank">Ministry of Defence of Mongolia</a></h6>
                    <img style="margin-top: 15px" class="foot1img rounded mx-auto d-block" src="{{url("/photos/yam.jpg")}}" alt="" width="100px">
                </div>
                <div class=" col-md-2 col-3 mt-3">
                    <h6 class="foot2 text-uppercase" style="text-align: center; color:white; text-shadow:0 0 20px black"><a  href="https://gsmaf.gov.mn/" target="_blank">General Staff of the Mongolian Armed Forces</a></h6>
                    <img class="foot2img rounded mx-auto d-block" src="{{url("/photos/janjin1.png")}}" alt="" width="100px">
                </div>
                <div class=" col-md-5 col-3 mt-3"></div>
                <div class="col-md-3 col-6 mb-4" style="color: white; text-shadow: 2px 2px 20px black; padding-bottom:0px; ">
                    <h5 class="foots1 text-uppercase" style="color: white">Холбоо барих:</h5>
                    <p class="foots2 fa fa-home" style="font-size: 18px; margin-bottom: 0"> : 210351 Улаанбаатар хот, Баянзүрх дүүрэг Энхтайвны өргөн чөлөө 51 </p>
                    <p class="foots3 fa fa-phone" style="font-size: 18px; margin-bottom: 0">: (976)  70152422</p></br>
                    <p class="foots4 fa fa-phone" style="font-size: 18px; margin-bottom: 0"> : (976) 262314</p></br>
                    <p class="foots4 fa fa-phone" style="font-size: 18px; margin-bottom: 0"> : (976) 92090035</p></br>
                    <p class="foots5 fa fa-envelope-o" style="font-size: 18px; margin-bottom: 0"> : gsmaf@mil.gov.mn</p>
                </div>
            </div>
        </div>
    </footer>
    <script src="{{url("bootstrap/js/bootstrap.min.js")}}"></script>
    <script src="{{url("bootstrap/js/bootstrap.bundle.min.js")}}"></script>
    <script src="{{url("myStyle/myStyle.js")}}"></script>
    <script src="{{url("myStyle/jquery.min.js")}}"></script>
    <script src="{{url("myStyle/bootstrap-4.min.js")}}"></script>
</body>
</html>
