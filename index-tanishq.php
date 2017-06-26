<?php

$name = "";
$email = "";
$comment = "";

if ($_POST["submit"]) {

         if (!$_POST['name']) {

             $error="<br />Please enter your name";

         } else {

             $name = strip_tags($_POST["name"]);
             $name = htmlspecialchars($name, ENT_QUOTES);
             $name = addslashes($name);

         }

         if (!$_POST['email']) {

             $error.="<br />Please enter your email address";

         } else {

             $email = strip_tags($_POST["email"]);
             $email = htmlspecialchars($email, ENT_QUOTES);
             $email = addslashes($email);

         }

         if (!$_POST['comment']) {

             $error.="<br />Please enter a comment";

         } else {

             $comment = strip_tags($_POST["comment"]);
             $comment = htmlspecialchars($comment, ENT_QUOTES);
             $comment = addslashes($comment);

         }

         if ($_POST['email']!="" AND !filter_var($_POST['email'],
FILTER_VALIDATE_EMAIL)) {

         $error.="<br />Please enter a valid email address";

         }

         $url = 'https://www.google.com/recaptcha/api/siteverify';
         $data = array('secret' => '6LdJZRkUAAAAACOZbdBDE4vZp2bTsR_MzLb-bWPI', 'response' => $_POST['g-recaptcha-response']);

         foreach($data as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
         $data_string = rtrim($data_string,'&');

         $ch = curl_init();
         curl_setopt($ch,CURLOPT_URL,$url);
         curl_setopt($ch,CURLOPT_POST,count($data));
         curl_setopt($ch,CURLOPT_POSTFIELDS,$data_string);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

         $result = curl_exec($ch);

         if ($result === false) {
            $error.="<br />Checking reCaptcha failed. Please try again";
         } else {
            $decoded = json_decode($result, true);

            if ($decoded[success] != true) {
               $error.="<br />Please try solving the reCaptcha again";
            }
         }


         if ($error) {

 $result='<div class="alert alert-danger"><strong>There were error(s)
in your form:</strong>'.$error.'</div>';

         } else {

 if (mail("adomingu@pppl.gov", "IPPEX ask a physicist", "Name: ".
$_POST['name']."

 Email: ".$_POST['email']."

 Comment: ".$_POST['comment'])) {

 $result='<div class="alert alert-success"><strong>Thank
you!</strong> We\'ll be in touch.</div>';

 } else {

 $result='<div class="alert alert-danger">Sorry, there was
an error sending your message. Please try again later.</div>';

 }



 }

 }





 ?>


<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="utf-8" />
<meta name="author" content="Script Tutorials" />
<title>IPPEX</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<!-- attach CSS styles -->
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="./css/style-tanishq.css" rel="stylesheet" />

    <!-- <link rel="stylesheet" href="toka.css"> -->
<link rel="stylesheet" href="bower_components/katex/dist/katex.min.css">
<script src="bower_components/katex/dist/katex.min.js"></script>
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/pixi/bin/pixi.min.js"></script>
<script src="bower_components/dat.gui/dat.gui.js"></script>
<script src="bower_components/stats.js/build/stats.min.js"></script>
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!--<script src="../tink/bin/tink.js"></script>-->
<script src="PIXI.draggable/bin/pixi.draggable.js"></script>
<script src="PIXI.Input-master/bin/pixi.input.js"></script>
<!--<script src="../sound.js/sound.js"></script>-->
<script src="howler.js/howler.js"></script>
<script src="libs/util/TweenMax.min.js"></script>
<script src="libs/kinematica/ui.js"></script>
<script src="toka_physics.js"></script>
<script src="functions.js"></script>
<script src="Ziggurat.js"></script>
<script src="setup.js"></script>
<script src="intro.js"></script>
<script src="front.js"></script>
<script src="play.js"></script>
<script src="endgame.js"></script>
<script src="createModals.js"></script>
<script src="exchangerFlows.js"></script>
<script src="lightWindows.js"></script>
<script src="pixi.draggable.releaseAll.js"></script>
<script src='https://www.google.com/recaptcha/api.js'></script>

<style>
    .emailForm {
    border:1px solid grey;
     border-radius:10px;
     margin-top:20px;
    }
    form {
     padding-bottom:20px;

    }
</style>

</head>
<body>

<!--  BODY PAGE CONTENT -->


<!-- navigation panel -->
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
<div class="container-fluid">
<!-- Brand and toggle get grouped for better mobile display -->
<div class="navbar-header">
<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-main">
<span class="sr-only">Toggle navigation</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
<a class="navbar-brand" href="#">IPPEX</a>
</div>
<div class="collapse navbar-collapse" id="navbar-collapse-main">
<ul class="nav navbar-nav navbar-right">
<li><a href="#home">Home</a></li>
<li><a href="#welcome">Welcome</a></li>
<li><a href="#fusion">What is Fusion</a></li>
<li><a href="#vt">Virtual Tokamak</a></li>
<li><a href="#remote">Remote Experiments</a></li>
<li><a href="#physics-modules">Physics Modules</a></li>
<li><a href="#physicist">Ask a Plasma Phycisist</a></li>
<!-- <li><a href="https://www.script-tutorials.com/bootstrap-one-page-template-with-parallax-effect/">Back to tutorial</a></li> -->
</ul>
</div><!-- /.navbar-collapse -->
</div><!-- /.container-fluid -->
</nav>

<!-- first section - Home -->
<div id="home" class="home">
    <div class="text-vcenter">
        <div style="background-color: rgba(0,0,0,0.6); width:100%"  >
            <h1>IPPEX</h1>
            <h3>The Interactive Plasma Physics Experience</h3>
            <a href="#welcome" class="btn btn-default btn-lg">Continue</a>
        </div>
        <div >
            <!-- <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> -->
        </div>

        <!-- <div class="text-vcenter text-center" style="background-color:red"  >
            <h1>IPPEX</h1>
            <h3>The Interactive Plasma Physics Experience</h3>
        </div> -->
    </div>
</div>
<!-- /first section -->

<!-- second section - About -->
<div id="welcome" class="pad-section">
<div class="container">
<div class="row">
<!-- <div class="col-sm-6">
<img src="images/logo.png" alt="" />
</div> -->
<div class="col-sm-12 text-center">
<h2>Welcome to the Interactive Plasma Physics Experience!</h2>
<p class="lead">Explore the exciting world of fusion science through our fun educational resources. Journey inside a plasma-confining tokamak, control plasma experiments online or use our physics modules!</p>
</div>
</div>
</div>
</div>
<!-- /second section -->

<!-- third section - Services -->
<!-- <div id="modules" class="pad-section">
<div class="container">
<h2 class="text-center">Our Services</h2> <hr />
<div class="row text-center">
<div class="col-sm-3 col-xs-6">
<i class="glyphicon glyphicon-cloud"> </i>
<h4>Service 1</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet. Donec in sem cras amet.</p>
</div>
<div class="col-sm-3 col-xs-6">
<i class="glyphicon glyphicon-leaf"> </i>
<h4>Service 2</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet. Donec in sem cras amet.</p>
</div>
<div class="col-sm-3 col-xs-6">
<i class="glyphicon glyphicon-phone-alt"> </i>
<h4>Service 3</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet. Donec in sem cras amet.</p>
</div>
<div class="col-sm-3 col-xs-6">
<i class="glyphicon glyphicon-bullhorn"> </i>
<h4>Service 4</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet. Donec in sem cras amet.</p>
</div>
</div>
</div> -->
<div class="pad-section" id="started">
    <div class="container text-center">
        <h2>Getting Started</h2>
        <p class="lead">Visit the sections below to explore different aspects of plasma physics and magnetically confined fusion.</p>
        <div class="row stylish-panel">
            <div class="col-sm-2 col-sm-offset-1">
                <div>
                    <a href="#fusion"><img src="images/fusion_square.png" alt="Texto Alternativo" class="img-circle img-thumbnail"></a>
                    <h2>What is<br>Fusion</h2>
                    <p>Watch a Phd Comics animated video on magnetic confinement fusion.</p>
                </div>
            </div>
            <div class="col-sm-2">
                <div>
                    <a href="#vt"><img src="images/vt_square.png" alt="Texto Alternativo" class="img-circle img-thumbnail"></a>
                    <h2>Virtual<br>Tokamak</h2>
                    <p>Control a virtual tokamak and, in the process, learn about creating electricity using magnetic confinement fusion.</p>
                </div>
            </div>
            <div class="col-sm-2">
                <div>
                    <a href="#physics-modules"><img src="images/magnet_square.png" alt="Texto Alternativo" class="img-circle img-thumbnail"></a>
                    <h2>Physics<br>Modules</h2>
                    <p>Delve into the science behind nuclear fusion with interactive experiments.</p>
                </div>
            </div>
            <div class="col-sm-2">
                <div>
                    <a href="#remote"><img src="images/rgdx_square.png" alt="Texto Alternativo" class="img-circle img-thumbnail"></a>
                    <h2>Remote<br>Experiments</h2>
                    <p>Remotely log into plasma experiments located at PPPL and control them through your browser.</p>
                </div>
            </div>
            <div class="col-sm-2">
                <div>
                    <a href="#physicist"><img src="images/ask.png" alt="Texto Alternativo" class="img-circle img-thumbnail"></a>
                    <h2>Ask a Plasma</br>Physicist</h2>
                    <p>Have a burning question about plasma, fusion or PPPL?  Ask us anything and we'll get back to you!</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- /third section -->

<div id="fusion" >
    <div class="text-center">
        <div style="background-color: rgba(0,0,0,0.6); width:100%"  >
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2>What is Fusion</h2>
                    <p class="lead">The animated video below, produced by PhD Comics, introduces the concept of plasma and magnetically confineed fusion.  It also provides a tour of the NSTXU device housed at the Princeton Plasma Physics Lab.</p>
                </div>
            </div>
        </div>
        <br><br>
        <div>
        <!-- <div class="embed-responsive embed-responsive-16by9" width="1010" height="600"> -->
            <!-- <iframe width="1010" height="568" src="./phdcomic.mp4" autostart="0" autoplay="0" frameborder="0" allowfullscreen controls></iframe> -->
            <video width="1010" height="568" controls="controls">
                <source src="./phdcomic.mp4" />
                <!-- <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English"> -->
                Nav doesn't support html5 video
            </video>
        </div>
    </div>
    <br><br>
    <br><br>
    <div id="vt">
        <div class="text-center">
            <div style="background-color: rgba(0,0,0,0.6); width:100%"  >
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h2>Virtual Tokamak</h2>
                        <p class="lead">The Virtual Tokamak is based on real plasma physics equations.</p>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-sm-12 text-center">
                <canvas id="game-canvas" width="1010" height="600"></canvas>
            </div>
        </div>
    </div>
    <br><br>
</div>
<!-- /fourth section -->
<div id="physics-modules" class="pad-section" style="color: black;">
    <div class="container text-center">
        <h2>Physics Modules</h2>
        <p class="lead">Explore and gain an understanding of the essential physics behind nuclear fusion through interactive experiments.</p>
        <p class="lead">More modules coming soon!</p>
        <div class="row stylish-panel">
            <div class="col-sm-4">
                <div>
                    <a><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail" data-toggle="modal" data-target="#physics-module-1"></a>
                    <h2>What <i>is</i> Electricity?</h2>
                    <p>Why does the phrase "opposites attract" exist? Learn about Coloumb's law and how electricity works.</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div>
                    <a><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail"></a>
                    <h2>Why do Atoms Stay Together?</h2>
                    <p>Learn about the strong force and its critical role in nuclear fusion in this module.</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div>
                    <a><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail"></a>
                    <h2>States of Matter</h2>
                    <p>What makes a block of ice different from a glass of water, beyond just the obvious temperature difference? What <i>is</i> temperature? Find out more in this module.</p>
                </div>
            </div>
        </div>
        <div class="row stylish-panel">
            <div class="col-sm-4 col-md-offset-2">
                <div>
                    <a><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail" data-toggle="modal" data-target="#physics-module-1"></a>
                    <h2>What <i>is</i> Electricity?</h2>
                    <p>Why does the phrase "opposites attract" exist? Learn about Coloumb's law and how electricity works.</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div>
                    <a><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail"></a>
                    <h2>Why do Atoms Stay Together?</h2>
                    <p>Learn about the strong force and its critical role in nuclear fusion in this module.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="physics-module-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body" style="overflow:hidden;">
            <iframe src = "/physics-modules/module-1.html" style="border:none; width: 100%; height:100%;" scrolling = "no" frameborder = "0"></iframe>
          </div>
        </div>
      </div>
    </div>
</div>
<!-- /fifth section -->
<div id="remote" class="pad-section">
    <div class="container text-center">
        <h2>Remote Experiments</h2>
        <p class="lead">Visit the sections below to explore different aspects of plasma physics and magnetically confined fusion.</p>
        <div class="row stylish-panel">
            <div class="col-sm-6">
                <div>
                    <a href="http://scied-web.pppl.gov/rgdx" target = "_blank"><img src="rgdx_gif.gif" alt="Texto Alternativo" class="img-thumbnail"></a>
                    <h2>Remote Glow Discharge Experiment</h2>
                    <p>Control a Plasma and observe it from your browser.  You can even do an actual quantitative plasma experiment.</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div>
                    <a href="http://planeterrella.pppl.gov" target = "_blank"><img src="rpx_gif.gif" alt="Texto Alternativo" class="img-thumbnail"></a>
                    <h2>Remote Planeterrella Experiment</h2>
                    <p>Model astrophysical phenomena like the auroras, magnetospheres or planetary ring currents and control and observe them from your home.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="physicist" class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3 emailForm">
            <h1>Ask a Plasma Physicist</h1>
            <?php echo $result; ?>
            <p class="lead">Have questions about plasmas, fusion and/or PPPL? Ask it here and we'll get back to you soon!</p>
            <form method="post">
                <div class="form-group">
                    <label for="name">Your Name:</label>
                    <input type="text" name="name" class="form-control" placeholder="Your Name"
                    value="<?php echo $name; ?>" />
                </div>
                <div class="form-group">
                    <label for="email">Your Email:</label>
                    <input type="email" name="email" class="form-control" placeholder="Your Email"
                    value="<?php echo $email; ?>" />
                </div>
                <div class="form-group">
                    <label for="comment">Your Question:</label>
                    <textarea class="form-control" name="comment"><?php echo $comment;  ?></textarea>
                </div>
                <div class="g-recaptcha" data-sitekey="6LdJZRkUAAAAAOo0KHewzsV07qhTTSD15C9-VfRe"></div>
                </br>
                <input type="submit" name="submit" class="btn btn-success btn-lg" value="Submit"/>
            </form>
        </div>
    </div>
</div>


<!-- footer -->
<footer>
<hr />

<div class="container">
    <div class="row center_align">
        <div class="col-lg-4">
            <img src="doe logo.png">
            <br>
            <p style="font-size:10px; color:gray">
                Princeton Plasma Physics Laboratory is a U.S. Department of Energy national laboratory managed by Princeton University.
            </p>
        </div>
<div class="col-lg-4">
<img src="princeton-logo.png">
<br>
<font size="1" color="gray">
Princeton Plasma Physics Laboratory
<br>
P.O. Box 451
<br>
Princeton, NJ 08543-0451
<br>
GPS: 100 Stellarator Road
<br>
Princeton, NJ, 08540
<br>
(609) 243-2000
</div>
<div class="col-lg-4">

</div>
</div>
</div>

</div>

</div>

</div>

</div>

</footer>
<!-- /footer -->

<!-- Run VT -->
<script src="./main.js"></script>

<!-- attach JavaScripts -->
<!--<script src="js/jquery-1.10.2.js"></script>
<script src="js/bootstrap.min.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!-- <script src="//maps.google.com/maps/api/js?sensor=true"></script> -->
<!-- <script src="js/main.js"></script> -->

<script type="text/javascript">
function hover(element) {
    element.setAttribute('src', 'images/fusion.gif');
}
function unhover(element) {
    element.setAttribute('src', 'images/fusion.png');
}


</script>

</body>
</html>
