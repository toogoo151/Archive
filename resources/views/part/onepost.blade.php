@extends('layouts.app')

@section('content')
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
              <link rel="stylesheet" href="{{ asset('/css/app2.css') }}" />

        <link rel="dns-prefetch" href="//fonts.gstatic.com">


<script src="https://kit.fontawesome.com/a81368914c.js" crossorigin="anonymous"></script>

    <!--Zagvarlag alert-->
    <link rel="stylesheet" href="{{ asset('/z-alert/css/alertify.core.css') }}" />
	  <link rel="stylesheet" href="{{ asset('/z-alert/css/alertify.default.css') }}" />
    <script src="{{ asset('/z-alert/js/alertify.min.js') }}"></script>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <!--Zagvarlag alert-->







</head>
<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400i,600,700,800&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
.menu-container{
  position: absolute;
  top: 8%;
  left: 65%;
  transform: translate(-50%, -50%);
  width: 300px;
  display: none;
  align-items: center;
  justify-content: center;
}
.button{
  position: relative;
  background: #0f639b;
  color: white;
  font-size: 20px;
  padding: 8px 20px;
  width: 150px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  cursor: pointer;
  transition: width .4s;
}
.button.expand{
  width: 40%;
}
.fas.expand:before{
  content: '\f00d';
}
ul{
  list-style: none;
  position: absolute;
  top: 65px;
  display: block;
  background: #0f639b;
  width: 70%;
  text-align: center;
  border-radius: 5px;
  display: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}
ul:before{
  position: absolute;
  content: '';
  width: 20px;
  height: 20px;
  background: #0f639b;
  top: -10px;
  right: 15px;
  transform: rotate(45deg);
  z-index: -1;
}
ul li{
  line-height: 35px;
  padding: 8px 20px;
  cursor: pointer;
  border: 1px solid transparent;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
ul li:last-child{
  border-bottom: none;
}
ul li:hover{
  box-shadow: inset 0 0 5px #33ffff,
              inset 0 0 10px #66ffff;
}
ul li:hover:first-child{
  border-radius: 5px 5px 0 0;
}
ul li:hover:last-child{
  border-radius: 0 0 5px 5px;
}
ul li a{
  color: white;
  font-size: 18px;
  text-decoration: none;
}
ul li:hover a{
  color: cyan;
}
</style>
<style>
    *{
        padding:0;
        margin:0;
        box-sizing:border-box;
    }
        /* body {
            font-family: 'Poppins', sans-serif;
        } */
        .wave{
            position: fixed;
            height: 100%;
            left: 0;
            bottom: 0;
            z-index: -1;
        }
        .container{
            /* width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 15rem;
            padding: 0 2rem; */
            /* position: none !important; */
        }
        .login-container{
            display: flex;
            align-items: center;
            text-align: center;
        }
        .cont1{
                position: none;
                left: -15px;
                padding: 45px 50px;
                /* background: #fff; */
                background: rgba(255,255,255,0.05);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-radius: 25px;
                /* backdrop-filter: blur(80px); */
                z-index: 1;
                transition: 0.5s;
                color: black;
                background-color:rgb(255, 255, 255, 0.9);
                /* background-color: rgb(254, 255, 255); */
                /* opacity: 2; */


            }
            .cont1:hover{
                left: -25px;
                padding: 65px 75px;
            }

        .img{
            /* display: flex;
            justify-content: flex-end;
            align-items: center; */
        }

        .form{
            width: 460px;
        }


        .img img{
            width: 500px;
            /* margin-right: 50px; */
            /* margin-top: -10%; */
        }

        .avatar{
            width: 220px;
        }
        .form h2{
            font-size: 2.9em;
            text-transform: uppercase;
            margin: 15px 0;
            color: #333;
        }
        .input-div{
            position: relative;
            display: grid;
            grid-template-columns: 7% 93%;
            margin: 25px 0;
            padding: 5px 0;
            border-bottom: 2px solid #d9d9d9;
        }
        .input-div:after, .input-div::before{
            content: '';
            position: absolute;
            bottom: -2px;
            width:0;
            height: 2px;
            background-color: #00B0FF;
            transition: .3s;
        }
        .input-div::after{
            right: 50%;
        }
        .input-div::before{
            left: 50%;
        }
        .input-div.focus .i i{
            color: #00B0FF;
        }

        .input-div.focus div h5{
            top: -5px;
            font-size: 15px;
        }

        .input-div.focus:after,.input-div.focus:before{
            width: 50%;
        }

        .input-div.one{
            margin-top: 0;
        }
        .input-div.two{
            margin-bottom: 4px;
        }
        .i{
            display:flex;
            justify-content: center;
            align-items: center;
        }

        .i i {
            color: #d9d9d9;
            transition: .3s;
        }
        .input-div > div{
            position: relative;
            height: 45px;
        }

        .input-div > div h5{
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            font-size: 18px;
            /* display: none; */
            transition: .3s;
        }
        .input{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            outline: none;
            background: none;
            padding: 0.5rem 0.7rem;
            font-size: 1.2rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
        }
        a{
            display: block;
            text-align: right;
            text-decoration: none;
            color: #999;
            font-size:0.9rem;
            transition: .3s;
        }
        .a:hover{
            color: #00B0FF;
            /* font-size: 5px; */
        }
        .btn{
            display: block;
            width:100%;
            height: 50%;
            border-radius: 25px;
            margin: 1rem 0;
            font-size: 1.2rem;
            outline: 0;
            border:none;
            background-image: linear-gradient(to right,#4234da,#2ac3d1, #0388e7);
            cursor: pointer;
            color: #fff;
            text-transform: uppercase;
            font-family: 'Poppins', sans-serif;
            background-size: 200%;
            transition: .5s;
        }
        .btn:hover{
            background-position: right;
        }
        /* @media screen and (max-width:2000px){
            .container{
                grid-gap: 5rem;
            }

        } */

        @media screen and (max-width:1050px){
            .container{
                grid-gap: 5rem;
            }

        }
        @media screen and (max-width:1000px){
            form{
                width: 290px;
            }
            form h2{
                font-size: 2.4rem;
                margin: 8px 0;
            }
        .img img{
            width: 400px;
        }
    }

    @media screen and (max-width:900px){
        .img{
            display: none ;
        }
            .topnav{
        display:none !important;
                      }

        .menu-container{
             display:flex;
         }


        .container{
            grid-template-columns: 1fr;
        }
        /* .wave{
            display: none;
        } */
        .login-container{
            justify-content: center;
        }
        .cont1{
            width: 300px;

        }
    }
            body {
    --menu-item-size: 50px;
    --green-color: #16284c;
    --blue-color: #1286d3;
    --dark-green-color: #539cd8;
    --white-color: #FFF;
    --gray-color: #EDEDED;
    --line-offset: calc((100% - var(--container-height))/ 2 + var(--menu-item-size) + 0.6em);
     background-image: url("/images/55.png");
     background-size: cover;
    /* backdrop-filter: blur(6px); */
        }

    .topnav {
     display: flex;
    list-style: none;
    /* top:00px; */
    margin: auto 100px;
    padding: 0.6em 0 0 0;
    /* left: 50%;  */
    /* top: -25px; */

        }

.topnav> a li {
    box-sizing: border-box;
    height: var(--menu-item-size);
    width: calc(4.5 * var(--menu-item-size));
    line-height: var(--menu-item-size);
    padding: 0 2em;
    margin: 1px;
    transition: 0.5s linear all;
    background: var(--green-color);
    color: var(--dark-green-color);
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    user-select: none;
        }

        .topnav > a li:not(.with-submenu) {
    clip-path: polygon(10% 0%, 0% 100%, 95% 100%, 100% 50%, 95% 0%);
    shape-outside: polygon(10% 0%, 0% 100%, 95% 100%, 100% 50%, 95% 0%);
}
.topnav > a li:nth-child(2) {
    transform: translateX(-5%);
}

.topnav > a li:nth-child(3) {
    transform: translateX(-10%)
}

.topnav>a  li:nth-child(4) {
    transform: translateX(-15%)
}

.topnav i {
    margin-right: 5px;
}

.topnav > li:hover:not(.active) {
    background: linear-gradient(to right, var(--green-color), var(--blue-color));
    color: var(--white-color);
}

.topnav >a  li:active:not(.active),
.topnav >a  li:active:not(.with-submenu){
    background: var(--blue-color);
    color: var(--white-color);
}

.topnav >a li:hover i:not(li.active) {
    color: #202020;
}

.topnav .active {
    color: var(--white-color);
    background: var(--blue-color);
    cursor: default;
    text-shadow: 1px 1px 1px var(--dark-green-color);
    font-size: 16px;
}

.topnav a li:hover {
  --size: 200px;
position: relative;
width: var(--size);
/* height: calc(var(--size) * 0.66); */
/* background-image: linear-gradient(135deg, #70F570 10%, #49C628 100%); */
color: #1a1a1b!important;

border-radius: 10px;
        }

.topnav a li :hover:after {
content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: calc(var(--size) * 0.13) solid transparent;
  border-bottom: 0;
  margin-left: calc(var(--size) * 0.13 * -1);
  margin-bottom: calc(var(--size) * 0.13 * -1);
        }

</style>
<body>

<img class="wave" src="images/wave.png">
  <div class="topnav">
        <a href="{{url("/info/onePost/1")}}" style="color: white">  <li class="active"><i class="fa fa-file" aria-hidden="true" style="color: white">&nbsp;</i>Бидний тухай</li></a>
        <a href="{{url("/image")}}" style="color: white"> <li style="color:white"> <i class="fa fa-picture-o" aria-hidden="true" style="color: white">&nbsp;</i>Зургийн цомог</li></a>
        <a href="{{url("/announcement")}}" style="color: white"> <li style="color:white"><i class="fa fa-bell" aria-hidden="true" style="color: white">&nbsp;</i>Зарлал</li></a>
                 <a href="{{url("/zaawar")}}"  target="_blank" style="color: white"> <li style="color:white"> <i class="fa fa-file-pdf-o" aria-hidden="true" style="color: white">&nbsp;</i>Заавар</li></a>
        <a href="{{url("/login")}}" style="color: white">  <li style="color:white"><i class="fa fa-sign-in" aria-hidden="true" style="color: white">&nbsp; </i>Нэвтрэх</li></a>
 </div>
  <div class="menu-container">
         <div class="button">
            Меню
            <span class="fas fa-bars"></span>
         </div>
         <ul>
            <li><a href="{{url("/info/onePost/1")}}">Бидний тухай</a></li>
            <li><a href="{{url("/image")}}">Зургийн цомог</a></li>
            <li><a href="{{url("/announcement")}}">Зарлал</a></li>
            <li><a href="{{url("/zaawar")}}"  target="_blank">Заавар</a></li>
            <li><a href="{{url("/login")}}">Нэвтрэх</a></li>
         </ul>
</div>
     <br>  <br>  <br>  <br>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12" id="post-data">
            <div class="card2" style="height: 900px;border-radius: 20px;
            display: flex;
            box-shadow: 0 0 20px 6px #242524; position:none;
            justify-content: space-between;">
            <br>
                <div class="card2-body" style="overflow-y: auto;">
<div class="card2" style="margin-bottom:20px;">
    <div class="card2-header">
        <h2 style="text-align: center">
        {{ strip_tags(str_replace( '&nbsp;', ' ',$post->title ))}}</h2>

        {{-- <h2 style="text-align: center">{{$post->title}}</h2> --}}
    </div>
    <div class="card2-body">
        <h5>
            {{-- {{ strip_tags(str_replace( '&nbsp;', ' ',$post->body ))}}</h5> --}}
                    {!!$post->body!!}

    </div>
</div>                </div>
            </div>
        </div>
    </div>
</div>

</body>
<script>
         $(document).ready(function(){
           $('.button').click(function(){
             if($(this).hasClass('expand')){
               $('ul').slideUp(function(){
                 $('.button').removeClass('expand');
                 $('.fas').removeClass('expand')
               });
             }else{
               $(this).addClass('expand');
               setTimeout(function(){
                 $('.fas').addClass('expand');
                 $('ul').stop().slideDown();
               },200);
             }
           });
         });
      </script>




@endsection
