<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="shortcut icon" type="image/ico" href="favicon.ico">

	<title>Supraball Server List</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">

</head>

<?PHP
	$file = fopen("http://supraverse.net/max_players.html", "rb");
	$output = '';
	while (!feof($file)) {
	 	$output .= fread($file, 8192);
	}
	fclose($file);
?>

<body>
	<div class="container-full">
		<section class="clearfix">
			<h1 class="pull-left">Supraball Serverlist</h1>
			<img class="pull-right" src="images/logo.png" alt="Supraball" width="100">

			<div class="info clearfix">
				<p class="pull-left">If you want to contribute head over to <a href="https://github.com/klikk/supraball-serverlist">https://github.com/klikk/supraball-serverlist</a></p>
				<p class="pull-right">Online players: <b class="online-players"></b>&nbsp;| All time players record: <span class="top-players"><?php echo $output ?></span></p>
			</div>

			<div class="table-responsive">
				<table id="server-list" class="table table-striped table-hover table-condensed" cellspacing="0">
					<thead>
						<tr>
							<th>IP</th>
							<th>Port</th>
							<th>Title</th>
							<th>Description</th>
							<th>Players</th>
							<th>Max spectators</th>
							<th>Max duration</th>
							<th>Max goals</th>
							<th>Players</th>
							<th>Current duration</th>
							<th>Goals red</th>
							<th>Goals blue</th>
							<th>Map</th>
							<th>Training</th>
						</tr>
					</thead>
				</table>
			</div>

		</section>
	</div>
	<script type="text/javascript" language="javascript" src="js/vendor/jquery.min.js"></script>
	<script type="text/javascript" language="javascript" src="js/vendor/jquery.noty.packaged.min.js"></script>
	<script type="text/javascript" language="javascript" src="js/vendor/jquery.dataTables.min.js"></script>
	<script type="text/javascript" language="javascript" src="js/vendor/dataTables.bootstrap.js"></script>
	<script type="text/javascript" language="javascript" src="js/main.js"></script>
</body>
</html>