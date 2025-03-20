<?php
header("Access-Control-Allow-Origin: *"); // autorise toutes les origines
header("Access-Control-Allow-Methods: POST"); // autorise uniquement les requêtes POST
header("Access-Control-Allow-Headers: Content-Type"); // autorise uniquement le type de contenu Content-Type

$db = mysqli_connect('localhost', 'benixags_vital14', 'fnW*,jE_%hXl', 'benixags_shop');
$db->set_charset("utf8");
if (!$db) {
    echo " database not connected";
} else {
    //	echo " database  connected";
}
$target_dir = "uploads/"; // dossier de destination où le fichier sera téléversé
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); // chemin complet du fichier sur le serveur
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

$id_product = $_POST['id_product'];
$seller_id = $_POST['seller_id'];

$base_filename = basename($_FILES["fileToUpload"]["name"]);

$temp = explode(".", $base_filename);

$target_file = $target_dir . round(microtime(true)) . '.' . end($temp);

$path = $target_file;


// Vérifie si le fichier est bien de type apk, exe ou zip
if($fileType != "apk" && $fileType != "exe" && $fileType != "zip") {
    echo "Seuls les fichiers APK, EXE ou ZIP sont autorisés.";
    $uploadOk = 0;
}

// Vérifie si l'upload s'est bien passé
if ($uploadOk == 0) {
    echo "Désolé, votre fichier n'a pas été téléversé.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {

        $sqlh = "SELECT id, id_product, seller_id, file_upload FROM numeric_product WHERE id_product='$id_product' and seller_id='$seller_id'";
        $resulta = $db->query($sqlh);
        if ($resulta->num_rows > 0) {
            $sqla = "UPDATE numeric_product SET file_upload='$path' WHERE id_product='$id_product' and seller_id='$seller_id'";
            if ($db->query($sqla) === TRUE) {
                // echo "Deuxième image inserer avec succès";
                echo "Le fichier a été téléversé avec succès.";
            } else {
                echo "Une erreur s'est produite lors de l'insertion dans la table.";
            }
        } else {
            $sql = "INSERT INTO numeric_product (id_product, seller_id, file_upload) VALUES ('$id_product', '$seller_id', '$path')";
            if ($db->query($sql) === TRUE) {
                // echo "Produit creer avec succès.Veillez ajouter les trois images restantes pour ce produit";
              //  echo "Le fichier ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " a été téléversé avec succès.";
              echo "Le fichier a été téléversé avec succès.";
            } else {
                echo "Une erreur s'est produite lors de l'insertion dans la table.";
            }
        }
    } else {
        echo "Une erreur s'est produite lors du téléversement de votre fichier.";
    }
}
