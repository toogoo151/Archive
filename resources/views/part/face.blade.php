         <!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body{
	margin: 0;
	padding: 0;
	font: 300 14px/18px Roboto;
	background-image: url('../images/texture.png');
 }


 *,
:after,
:before {
  box-sizing: border-box
}

.clearfix:after,
.clearfix:before {
  content: '';
  display: table
}

.clearfix:after {
  clear: both;
  display: block
}
ul{
	list-style:none;
	margin: 0;
	padding: 0;
}
a, a:hover, a.active, a:active, a:visited, a:focus{
	color:#fefefe;
	text-decoration:none;
}
.content{
	/* margin: 50px 50px 0px 50px; */
    margin-top: 2px;
}

.exo-menu{
	width: 100%;
	float: left;
	list-style: none;
	position:relative;
	background: #23364B;
}
.exo-menu > li {	display: inline-block;float:left;}
.exo-menu > li > a{
	color: #ccc;
	text-decoration: none;
	text-transform: uppercase;
	border-right: 1px #365670 dotted;
	-webkit-transition: color 0.2s linear, background 0.2s linear;
	-moz-transition: color 0.2s linear, background 0.2s linear;
	-o-transition: color 0.2s linear, background 0.2s linear;
	transition: color 0.2s linear, background 0.2s linear;
}
.exo-menu > li > a.active,
.exo-menu > li > a:hover,
li.drop-down ul > li > a:hover{
	background:#009FE1;
	color:#fff;
}
.exo-menu i {
  float: left;
  font-size: 18px;
  margin-right: 6px;
  line-height: 20px !important;
}
li.drop-down,
.flyout-right,
.flyout-left{position:relative;}
li.drop-down:before {
  content: "\f103";
  color: #fff;
  font-family: FontAwesome;
  font-style: normal;
  display: inline;
  position: absolute;
  right: 6px;
  top: 20px;
  font-size: 14px;
}
li.drop-down>ul{
	left: 0px;
	min-width: 230px;

}
.drop-down-ul{display:none;}
.flyout-right>ul,
.flyout-left>ul{
  top: 0;
  min-width: 230px;
  display: none;
  border-left: 1px solid #365670;
  }

li.drop-down>ul>li>a,
.flyout-right ul>li>a ,
.flyout-left ul>li>a {
	color: #fff;
	display: block;
	padding: 20px 22px;
	text-decoration: none;
	background-color: #365670;
	border-bottom: 1px dotted #547787;
	-webkit-transition: color 0.2s linear, background 0.2s linear;
	-moz-transition: color 0.2s linear, background 0.2s linear;
	-o-transition: color 0.2s linear, background 0.2s linear;
	transition: color 0.2s linear, background 0.2s linear;
}
.flyout-right ul>li>a ,
.flyout-left ul>li>a {
	border-bottom: 1px dotted #B8C7BC;
}


/*Flyout Mega*/
.flyout-mega-wrap {
	top: 0;
	right: 0;
	left: 100%;
	width: 100%;
	display:none;
	height: 100%;
	padding: 15px;
	min-width: 742px;

}
h4.row.mega-title {
  color:#eee;
  margin-top: 0px;
  font-size: 14px;
  padding-left: 15px;
  padding-bottom: 13px;
  text-transform: uppercase;
  border-bottom: 1px solid #ccc;
 }
.flyout-mega ul > li > a {
  font-size: 90%;
  line-height: 25px;
  color: #fff;
  font-family: inherit;
}
.flyout-mega ul > li > a:hover,
.flyout-mega ul > li > a:active,
.flyout-mega ul > li > a:focus{
  text-decoration: none;
  background-color: transparent !important;
  color: #ccc !important
}
/*mega menu*/

.mega-menu {
  left: 0;
  right: 0;
  padding: 15px;
  display:none;
  padding-top: 0;
  min-height: 100%;

}
h4.row.mega-title {
  color: #eee;
  margin-top: 0px;
  font-size: 14px;
  padding-left: 15px;
  padding-bottom: 13px;
  text-transform: uppercase;
  border-bottom: 1px solid #547787;
  padding-top: 15px;
  background-color: #365670
  }
 .mega-menu ul li a {
  line-height: 25px;
  font-size: 90%;
  display: block;
}
ul.stander li a {
    padding: 3px 0px;
}

ul.description li {
    padding-bottom: 12px;
    line-height: 8px;
}

ul.description li span {
    color: #ccc;
    font-size: 85%;
}
a.view-more{
  border-radius: 1px;
  margin-top:15px;
  background-color: #009FE1;
  padding: 2px 10px !important;
  line-height: 21px !important;
  display: inline-block !important;
}
a.view-more:hover{
	color:#fff;
	background:#0DADEF;
}
ul.icon-des li a i {
    color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    background-color: #009FE1;
    line-height: 35px !important;
}


ul.icon-des li {
    width: 100%;
    display: table;
    margin-bottom: 11px;
}
/*Blog DropDown*/
.Blog{
	left:0;
	display:none;
	color:#fefefe;
	padding-top:15px;
	background:#547787;
	padding-bottom:15px;
}
.Blog .blog-title{
	color:#fff;
	font-size:15px;
	text-transform:uppercase;

}
.Blog .blog-des{
	color:#ccc;
	font-size:90%;
	margin-top:15px;
}
.Blog a.view-more{
	margin-top:0px;
}
/*Images*/
.Images{
	left:0;
   width:100%;
	 display:none;
	color:#fefefe;
	padding-top:15px;
	background:#547787;
	padding-bottom:15px;
}
.Images h4 {
  font-size: 15px;
  margin-top: 0px;
  text-transform: uppercase;
}
/*common*/
.flyout-right ul>li>a ,
.flyout-left ul>li>a,
.flyout-mega-wrap,
.mega-menu{
	background-color: #547787;
}

/*hover*/
.Blog:hover,
.Images:hover,
.mega-menu:hover,
.drop-down-ul:hover,
li.flyout-left>ul:hover,
li.flyout-right>ul:hover,
.flyout-mega-wrap:hover,
li.flyout-left a:hover +ul,
li.flyout-right a:hover +ul,
.blog-drop-down >a:hover+.Blog,
li.drop-down>a:hover +.drop-down-ul,
.images-drop-down>a:hover +.Images,
.mega-drop-down a:hover+.mega-menu,
li.flyout-mega>a:hover +.flyout-mega-wrap{
	display:block;
}
/*responsive*/
 @media (min-width:767px){
	.exo-menu > li > a{
	display:block;
	padding: 20px 22px;
 }
.mega-menu, .flyout-mega-wrap, .Images, .Blog,.flyout-right>ul,
.flyout-left>ul, li.drop-down>ul{
		position:absolute;
}
 .flyout-right>ul{
	left: 100%;
	}
	.flyout-left>ul{
	right: 100%;
}
 }
@media (max-width:767px){

	.exo-menu {
		min-height: 58px;
		background-color: #23364B;
		width: 100%;
	}

	.exo-menu > li > a{
		width:100% ;
	    display:none ;

	}
	.exo-menu > li{
		width:100%;
	}
	.display.exo-menu > li > a{
	  display:block ;
	  	padding: 20px 22px;
	}

.mega-menu, .Images, .Blog,.flyout-right>ul,
.flyout-left>ul, li.drop-down>ul{
		position:relative;
}

}
a.toggle-menu{
    position: absolute;
    right: 0px;
    padding: 20px;
    font-size: 27px;
    background-color: #ccc;
    color: #23364B;
    top: 0px;

}
.blink-soft {
  animation: blinker 1.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.visit-my-blog {
    background: #379fe1;
}
        </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    {{-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"> --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{url("myStyle/myStyle.css")}}">
    {{-- <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'> --}}
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
       {{-- <link rel="dns-prefetch" href="//fonts.gstatic.com"> --}}
        <link rel="stylesheet" href="{{ asset('/css/holboos.css') }}" />
{{-- <link rel="stylesheet" href="{{ asset('/css/posts/bootstrap.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/posts/bootstrap.min.css') }}" /> --}}
<link rel="stylesheet" href="{{ asset('/css/posts/owl.carousel.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/posts/temp.css') }}" />
<link rel="stylesheet" href="{{ asset('/css/imageShowTool/photo-show-style.css') }}" />
    <title> ЭНХИЙГ ДЭМЖИХ АЖИЛЛАГАА</title>
</head>

        	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">



</head>

<body class="background">
	 <div class="content">

		<ul class="exo-menu">
			<li><a class="active" href="#"><i class="fa fa-home"></i> Home</a></li>
			<li class="drop-down"><a href="#"><i class="fa fa-cogs"></i> Flyout</a>
				<!--Drop Down-->
				<ul class="drop-down-ul animated fadeIn">
				<li class="flyout-right"><a href="#">Flyout Right</a><!--Flyout Right-->
					<ul class="animated fadeIn">
						<li><a href="#">Mobile</a></li>
						<li><a href="#">Computer</a></li>
						<li><a href="#">Watch</a></li>
					</ul>
				</li>

				<li class="flyout-left"><a href="#">Flyout Left</a><!--Flyout Left-->
					<ul class="animated fadeIn">
						<li><a href="#">Mobile</a></li>
						<li><a href="#">Computer</a></li>
						<li><a href="#">Watch</a></li>
					</ul>
				</li>

				<li><a href="#">No Flyout</a></li>

				</ul>
				<!--//End drop down-->

			</li>
			<li><a href="#"><i class="fa fa-cogs"></i> Services</a></li>
			<li><a href="#"><i class="fa fa-briefcase"></i> Portfolio</a></li>
			<li class="mega-drop-down"><a href="#"><i class="fa fa-list"></i> Mega Menu</a>
				<div class="animated fadeIn mega-menu">
					<div class="mega-menu-wrap">
						<div class="row">
						<div class="col-md-4">
							<h4 class="row mega-title">Feature</h4>
								<img class="img-responsive" src="https://3.bp.blogspot.com/-rUk36pd-LbM/VcLb48X4f-I/AAAAAAAAGCI/Y_UxBAgEqwA/s1600/Magento_themes.jpg">
							</div>
							<div class="col-md-2">
									<h4 class="row mega-title">Standers</h4>
								<ul class="stander">
									<li><a href="#">Mobile</a></li>
									<li><a href="#">Computer</a></li>
									<li><a href="#">Watch</a></li>
									<li><a href="#">laptop</a></li>
									<li><a href="#">Camera</a></li>
									<li><a href="#">I pad</a></li>
									<li><a class="view-more btn- btn-sm" href="#">View more</a></li>
								</ul>
							</div>
							<div class="col-md-3">
								<h4 class="row mega-title">Description</h4>
								<ul class="description">
									<li><a href="#">Women</a>
										<span>Description of Women</span>
									</li>
									<li><a href="#">Men</a>
											<span>Description of men Cloths</span>
									</li>
									<li><a href="#">Kids</a>
											<span>Description of Kids Cloths</span>
									</li>
									<li><a href="#">Others</a>
											<span>Description of Others Cloths</span>
									</li>
									<li>
									<a class="view-more btn btn-sm " href="#">View more</a>

									</li>
								</ul>
							</div>
							<div class="col-md-3">
							<h4 class="row mega-title">Icon + Description</h4>
								<ul class="icon-des">
									<li><a href="#"><i class="fa fa-globe"></i>Web</a></li>
									<li><a href="#"><i class="fa fa-mobile"></i>Mobile</a></li>
									<li><a href="#"><i class="fa fa-arrows-h"></i>Responsive</a></li>
									<li><a href="#"><i class="fa fa-desktop"></i>Desktop</a></li>
									<li><a href="#"><i class="fa fa-paint-brush"></i>UI/UX</a></li>
								</ul>
							</div>

						</div>
					</div>
				</div>
			</li>
			<li class="blog-drop-down"><a href="#"><i class="fa fa-bullhorn"></i> Blog</a>
				<div class="Blog animated fadeIn">
					<div class="col-md-4">
						<img class="img-responsive" src="https://2.bp.blogspot.com/-VG_e0pKfrDo/VcLb6JwZqfI/AAAAAAAAGCk/8ZgA9kZqTQ8/s1600/images3.jpg">
						<div class="blog-des">
					<h4 class="blog-title">Lorem ipsum dolor sit amet</h4>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
							nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
							Duis autem vel eum iriure dolor in hendrerit in vulputate. </p>
							<a class="view-more btn- btn-sm" href="#">Read More</a>
						</div>
					</div>
					<div class="col-md-4">
						<img class="img-responsive" src="https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg">
						<div class="blog-des">
						<h4 class="blog-title">Lorem ipsum dolor sit amet</h4>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
							nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
							Duis autem vel eum iriure dolor in hendrerit in vulputate. </p>
									<a class="view-more btn- btn-sm" href="#">Read More</a>
						</div>
					</div>
					<div class="col-md-4">
						<img class="img-responsive" src="https://4.bp.blogspot.com/-A7U1uPlSq6Y/VcLb5kKHCkI/AAAAAAAAGCc/7WghyndTEuY/s1600/images2.jpg">
						<div class="blog-des">
						<h4 class="blog-title">Lorem ipsum dolor sit amet</h4>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
							nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
							Duis autem vel eum iriure dolor in hendrerit in vulputate. </p>
									<a class="view-more btn- btn-sm" href="#">Read More</a>
						</div>
					</div>


				</div>
			</li>
			<li  class="images-drop-down"><a  href="#"><i class="fa fa-photo"></i> Images</a>
				<div class="Images animated fadeIn">
					<div class="col-md-3">
						<h4>Images Title </h4>
						<img class="img-responsive" src="https://2.bp.blogspot.com/-VG_e0pKfrDo/VcLb6JwZqfI/AAAAAAAAGCk/8ZgA9kZqTQ8/s1600/images3.jpg">
					</div>
					<div class="col-md-3">
					<h4>Images Title </h4>
						<img class="img-responsive" src="https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg">
					</div>
					<div class="col-md-3">
					<h4>Images Title </h4>
						<img class="img-responsive" src="https://4.bp.blogspot.com/-A7U1uPlSq6Y/VcLb5kKHCkI/AAAAAAAAGCc/7WghyndTEuY/s1600/images2.jpg">
					</div>
					<div class="col-md-3">
					<h4>Images Title </h4>
						<img class="img-responsive"  src="https://3.bp.blogspot.com/-hGrnZIjzL2k/VcLb47kyQKI/AAAAAAAAGCQ/J6Q2IAHIQvQ/s1600/image4.jpg">
					</div>

				</div>

			</li>
			{{-- <li><a class="blink-soft visit-my-blog" href="https://cssstuffs.com/free-responsive-mega-menu-code-drop/" target="_black"><i class="fa fa-link"></i> Visit My Blog</a>
				<div class="contact">

				</div>
			</li> --}}
			<a href="#" class="toggle-menu visible-xs-block">|||</a>
	</ul>


	 </div>
        {{-- <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div class="container">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="fa fa-bars"></span> Menu
            </button>
                <div class="collapse navbar-collapse" id="ftco-nav">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item active home"><a href="{{url("/")}}" class="nav-link">НҮҮР</a></li>
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
                               <a class="dropdown-item" href="{{url("/see/video")}}">ЗААВАР ВИДЕО</a>
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
            <li class="nav-item">
    <a href="{{url("/login")}}" class="nav-link">
          <i class="fa fa-sign-in">НЭВТРЭХ</i>
    </a>
    <br>


</li>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> --}}
    <div class="txtBack">
        {{-- <img class="wave" src="images/hmm.png" style="width: 100%; height: 100%;"> --}}

        {{-- <div class="row">
            <p class="col-sm-1 col-md-1"></p>
            <p class="col-sm-10 col-md-10 text1" >FEMALE PEACEKEEPERS INTERNATIONAL CONFERENCE</p>
            <p class="col-sm-1 col-md-1 text1" ></p>
        </div>
        <div class="row">
            <p class="col-sm-1 col-md-1 text2"></p>
            <p class="col-sm-10 col-md-10 text2">FPIC 2022</p>
            <p class="col-sm-1 col-md-1 text2"></p>
        </div>
        <p class="text3" >WOMEN, PEACE, AND SECURITY</p>
        <p class="text7">“Strengthening the Role of Women in Peacekeeping”
        </p> --}}
    </div>
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
                    @include("part.datenews")
                </div>
            </div>
        </div>
    </div>
</div>
<br>
</body>

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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <script type="text/javascript">
$(function () {
 $('.toggle-menu').click(function(){
	$('.exo-menu').toggleClass('display');

 });
});

</script>
    {{-- <script src="{{url("bootstrap/js/bootstrap.min.js")}}"></script> --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js" integrity="sha512-ykZ1QQr0Jy/4ZkvKuqWn4iF3lqPZyij9iRv6sGqLRdTPkY69YX6+7wvVGmsdBbiIfN/8OdsI7HABjvEok6ZopQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js" integrity="sha512-7Pi/otdlbbCR+LnW+F7PwFcSDJOuUJB3OxtEHbg4vSMvzvJjde4Po1v4BR9Gdc9aXNUNFVUY+SK51wWT8WF0Gg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    {{-- <script src="{{url("bootstrap/js/bootstrap.bundle.min.js")}}"></script> --}}
    <script src="{{url("myStyle/myStyle.js")}}"></script>

    {{-- <script src="{{url("myStyle/jquery.min.js")}}"></script> --}}
    <script src="{{url("myStyle/bootstrap-4.min.js")}}"></script>
</html>
