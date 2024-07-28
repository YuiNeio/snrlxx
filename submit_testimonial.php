<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $tag = htmlspecialchars($_POST["tag"]);
    $message = htmlspecialchars($_POST["message"]);
    $profile_image = '';

    if (isset($_FILES["profile_image"]) && $_FILES["profile_image"]["error"] == 0) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["profile_image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $allowed_types = array("jpg", "jpeg", "png", "gif");

        if (in_array($imageFileType, $allowed_types)) {
            if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $target_file)) {
                $profile_image = $target_file;
            }
        }
    }

    $new_testimonial = array(
        "name" => $name,
        "tag" => $tag,
        "message" => $message,
        "profile_image" => $profile_image
    );

    $file_path = 'testimonials.json';
    if (file_exists($file_path)) {
        $testimonials = json_decode(file_get_contents($file_path), true);
    } else {
        $testimonials = array();
    }

    $testimonials[] = $new_testimonial;
    file_put_contents($file_path, json_encode($testimonials));

    header("Location: index.php");
    exit();
}
?>