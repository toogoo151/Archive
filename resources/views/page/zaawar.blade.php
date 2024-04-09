<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <title>Заавар</title>
    <style>
        body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background: linear-gradient(to left, #ffffff 0%, #33ccff 100%);
}


 .btn {
  border: none;
  font-family: 'Lato';
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 25px 80px;
  display: inline-block;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
width: 85%;
border-radius: 15px;

}

.btn:after {
  content: '';
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;

}

/* Pseudo elements for icons */
.btn:before {
  font-family: 'FontAwesome';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  position: relative;
  -webkit-font-smoothing: antialiased;
}


/* Icon separator */
.btn-sep {
  padding: 25px 60px 25px 120px;
}

/* .btn-sep:before {
  background: rgba(0,0,0,0.15);
} */

/* Button 1 */
.btn-1 {
  background: #3498db;
  color: #fff;
}

.btn-1:hover {
  background: #2980b9;
}

.btn-1:active {
  background: #2980b9;
  top: 2px;
}

.btn-1:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}

/* Button 2 */
.btn-2 {
  background: #2ecc71;
  color: #fff;
}

.btn-2:hover {
  background: #27ae60;
}

.btn-2:active {
  background: #27ae60;
  top: 2px;
}

.btn-2:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}

/* Button 3 */
.btn-3 {
  background: #e74c3c;
  color: #fff;
}

.btn-3:hover {
  background: #c0392b;
}

.btn-3:active {
  background: #c0392b;
  top: 2px;
}

.btn-3:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}

/* Button 3 */
.btn-4 {
  background: #34495e;
  color: #fff;
}

.btn-4:hover {
  background: #2c3e50;
}

.btn-4:active {
  background: #2c3e50;
  top: 2px;
}

.btn-4:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}

/* Icons */

.icon-cart:before {
  content: "\f07a";
}

.icon-heart:before {
  content: "\f55a";
}

.icon-info:before {
  content: "\f05a";
}

.icon-send:before {
  content: "\f1d8";
}
        </style>
</head>

<body>

<div class="container">

        <h2  style="text-align: center">
             <img src="images/GsmafLogo.png"  width="80" height="100">
            <br>ЭНХИЙГ ДЭМЖИХ АЖИЛЛАГААНЫ <br/>СОНГОН ШАЛГАРУУЛАЛТЫН СИСТЕМИЙГ АШИГЛАХ ЗААВАР</h2>


    <!-- <h2 class="hidden" style="text-align: center;"></h2>
   -->

    {{-- <div class="col-md-6">
        <a href="https://google.com">
        <button class="btn btn-4 btn-sep fa fa-file">

            ХЭРЭГЛЭГЧИЙН ЗААВАРЧИЛГАА</button></a>
    </div> --}}

    <div class="col-md-6" style="text-align: center">

        <button class="btn btn-4 btn-sep fa fa-file-pdf-o" id="pdfButton2">Сонгон шалгаруулалтад оролцох хүсэлтэй ЦАХ-тай холбоотой заавар</button>
    </div>

    <div class="col-md-6" style="text-align: center">

        <button class="btn btn-1 btn-sep fa fa-file-pdf-o" id="pdfButton">Анги, байгууллагын хүний нөөцийн мэргэжилтэнтэй холбоотой заавар</button>
    </div>
     <div class="col-md-6" style="text-align: center">

        <button class="btn btn-4 btn-sep fa fa-file-video-o" id="videoButton">Сонгон шалгаруулалтад оролцох хүсэлтэй ЦАХ-тай холбоотой видео заавар</button>
    </div>
     <div class="col-md-6" style="text-align: center">

        <button class="btn btn-4 btn-sep fa fa-file-video-o" id="videoDoc">Бичиг баримт оруулах заавар</button>
    </div>


</div>

</body>
</html>
{{-- <script>
  // Get the button element
  var button = document.getElementById('pdfButton');

  // Add a click event listener to the button
  button.addEventListener('click', function() {
    // Open the PDF viewer in a new window or tab
    window.open('images/unitAdmin.pdf', '_blank');
  });
</script> --}}
<script>
  // Get the button element
  var button = document.getElementById('pdfButton');

  // Add a click event listener to the button
  button.addEventListener('click', function() {
    // Open the PDF viewer in a new window or tab
    window.open('https://wpsic-mongolia2022.gov.mn/images/unitAdmin.pdf', '_blank');
  });
</script>

<script>
    // Get the button element
    var button = document.getElementById('pdfButton2');

    // Add a click event listener to the button
    button.addEventListener('click', function() {
      // Open the PDF viewer in a new window or tab
      window.open('https://wpsic-mongolia2022.gov.mn/images/User.pdf', '_blank');
    });
  </script>

  <script>
  // Get the button element
  var button = document.getElementById('videoButton');

  // Add a click event listener to the button
  button.addEventListener('click', function() {
    // Open the video in a new window or tab
    window.open('https://wpsic-mongolia2022.gov.mn/images/Batalgaajuulalt.mp4');
  });
</script>
  <script>
  // Get the button element
  var button = document.getElementById('videoDoc');

  // Add a click event listener to the button
  button.addEventListener('click', function() {
    // Open the video in a new window or tab
    window.open('https://wpsic-mongolia2022.gov.mn/images/Document.mp4');
  });
</script>
