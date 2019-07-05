<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 6/18/2019
 * Time: 2:54 PM
 */
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$url = "https://trippi.travel.co.za/partner/xml/client/packages-layby.xml";
$xml = simplexml_load_file($url);

$itemData = [];
foreach($xml->product as $item)

{
    $itemData[]=[
    'item_id' => $item->id,
    'item_name' => $item->name,
    'destinations' => $item->destinations,
    'item_price' => substr($item->randprice, 1),
    'item_description' => $item->description,
    ];
    $price = substr($item->randprice, 1);


}

print_r(json_encode($xml));