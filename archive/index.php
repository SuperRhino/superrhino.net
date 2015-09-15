<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>SuperRhino.net</title>
        <meta name="description" content="This is SuperRhino.net – What's here? Just some things...">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta property="og:image" content="http://superrhino.net/rpp/skyClouds.jpg">

    </head>
    <body style="margin:0;padding:0;">
        <!--[if lt IE 9]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <?php if ( isset($_GET['text']) ): ?>

        <!-- Add your site or application content here -->
        <h1>Hello world!</h1>
        <h2>This is <a href="/">SuperRhino.net</a></h2>
        <p>What's here? Just some things:</p>
        <ul>
            <li><a href="/lottery">Draft Lottery</a>
            <li><a href="/keepers">Keeper Eligibility</a>
            <li><a href="/rpp">rpp/</a>
        </ul>

        <?php else: ?>

        <div id="tackk-zwly5p" style="margin:0;padding:0;overflow:hidden;width:100%;height:2085px">
            <iframe id="tackk-zwly5p-frame" src="https://tackk.com/zwly5p/embed" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
        </div>

        <?php endif; ?>

    </body>
</html>