<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib/dblib.php';
require_once __DIR__ . '/vendor/autoload.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$fb = new Facebook\Facebook([
  'app_id' => $SETTINGS['fb']['app_id'], // Replace {app-id} with your app id
  'app_secret' => $SETTINGS['fb']['app_secret'],
  'default_graph_version' => 'v2.2',
  ]);

// Login

$helper = $fb->getRedirectLoginHelper();
$_SESSION['FBRLH_state']=$_GET['state'];

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}

// Logged in

// Debug
//echo '<h3>Access Token</h3>';
//var_dump($accessToken->getValue());

// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client();

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);

// Debug
//echo '<h3>Metadata</h3>';
//var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId($SETTINGS['fb']['app_id']); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
  } catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
    exit;
  }

  // Debug
  //echo '<h3>Long-lived</h3>';
  //var_dump($accessToken->getValue());
}

// Debug
//var_dump($accessToken);

$_SESSION['fb_access_token'] = (string) $accessToken;

// Get user
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get('/me?fields=id,name,email', (string) $accessToken);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

$fbuser = $response->getGraphUser();

// Debug
//echo "<h3>User</h3>";
//var_dump($fbuser);

// Save user or get existing from database
$u = new stdClass();
$u->name = $fbuser['name'];
$u->email = $fbuser['email'];
$u->fbid = $fbuser['id'];

$user = DB::createGetUser($u);
//var_dump($user);
$_SESSION['USERID'] = $user->id;

// cookie for js to know if user is logged in
setcookie('userloggedin', 'true');

// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.
header('Location: index.php');
die();