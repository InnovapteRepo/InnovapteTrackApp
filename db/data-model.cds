namespace innovapte.innovtrack;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity TiveDevice {
  key DeviceId   : String(15);
  key DeviceName : String(7);
      Delivery   : String(25);
}

entity TiveData : managed {
  key delivery    : String(25);
  key deviceId    : String(15); //'865648068675040'
  key date        : Date;
  key time        : Time;
      latitude    : Decimal(4, 2);
      longitude   : Decimal(4, 2);
      location    : String(250); //'R762+6X Surčin, Serbia'
      humidity    : Decimal(4, 2);
      temperature : Decimal(4, 2); //65.0960922241211
      dewPoint    : Decimal(4, 2);
      battery     : Integer; //9
}


entity Shipment : managed {
  shipment_key                  : Integer;
  shipment_status               : Integer;
  shipment_number               : String(50);
  shipment_item_number          : String(50);
  shipment_type_key             : Integer;
  shipment_create_date          : Timestamp;
  shipment_update_date          : Timestamp;
  shipment_date                 : Timestamp;
  product_key                   : Integer;
  fagent_enterprise_key         : Integer;
  shipment_del_batch_item_no    : String(100);
  shipment_ship_date            : Timestamp;
  shipment_delivery_date        : Timestamp;
  shipment_typ_or_label         : String(100);
  shipment_ship_to              : String(100);
  shipment_ship_to_name         : String(100);
  shipment_shipto1              : String(100);
  shipment_shipto2              : String(100);
  shipment_shipto3              : String(100);
  shipment_shipto4              : String(100);
  shipment_ship_to_city         : String(100);
  shipment_ship_to_state        : String(100);
  shipment_ship_to_country      : String(100);
  shipment_ship_to_street       : String(100);
  shipment_ship_to_post_code    : String(100);
  shipment_sold_to              : String(100);
  shipment_sold_to_name         : String(100);
  shipment_sold_to_street       : String(100);
  shipment_sold_to_city         : String(100);
  shipment_sold_to_state        : String(100);
  shipment_sold_to_country      : String(100);
  shipment_sold_to_post_code    : String(100);
  shipment_cust_emerg_phone     : String(100);
  shipment_cust_code_text       : String(255);
  shipment_po                   : String(100);
  shipment_customer_po          : String(255);
  product_number                : String(100);
  product_name                  : String(100);
  shipment_plant                : String(100);
  shipment_expdate              : Timestamp;
  shipment_pkg_no               : String(100);
  shipment_storage              : String(255);
  shipment_i_net_lb             : Integer;
  shipment_i_net_kg             : Integer;
  shipment_i_gross_lb           : Integer;
  shipment_i_gross_kg           : Integer;
  shipment_i_tare_lb            : Integer;
  shipment_i_tare_kg            : Integer;
  shipment_i_uom                : String(100);
  shipment_lot                  : String(100);
  shipment_ship_point           : String(100);
  shipment_ship_point_name      : String(100);
  shipment_ship_point_street    : String(100);
  shipment_ship_point_city      : String(100);
  shipment_ship_point_country   : String(100);
  shipment_ship_point_state     : String(100);
  shipment_ship_point_post_code : String(100);
  shipment_fagent               : String(100);
  shipment_fagent_name          : String(100);
  shipment_fagent_street        : String(100);
  shipment_fagent_city          : String(100);
  shipment_fagent_state         : String(100);
  shipment_fagent_country       : String(100);
  shipment_fagent_post_code     : String(100);
  shipment_idoc                 : String(100);
  shipment_record_key           : Integer;
  delivery_file_name            : String(150);
  shipment_partner              : String(100);
  sender_port                   : String(100);
}


entity Shipment_batch : managed {
  shipment_batch_key      : Integer;
  shipment_batch_type_key : Integer;
  shipment_batch_status   : Integer;
  shipment_key            : Integer;
  shipment_number         : String(50);
  shipment_item_number    : String(255);
  hu_number               : String(50);
  item_posnr              : String(50);
  item_pack_quantity      : Integer;
  item_b_net_kg           : Integer;
  item_b_gross_kg         : Integer;
  item_sku                : String(20);
  item_batch_no           : String(20);
  item_storage_loc        : String(20);
  device_id               : String(150);
  create_date             : Timestamp;
  create_user_key         : Integer;
  update_date             : Timestamp;
  update_user_key         : Integer;
}

entity SHIPMENT_CONTACT {
  shipment_contact_key      : Integer;
  shipment_contact_type_key : Integer;
  shipment_contact_status   : Integer;
  contact_id                : String(20);
  enterpirse_key            : Integer;
  contact_language          : String(20);
  contact_name1             : String(150);
  contact_name2             : String(150);
  contact_postl_code        : String(30);
  contact_city              : String(120);
  contact_telephone         : String(20);
  contact_email             : String(80);
  contact_country           : String(20);
  contact_freq              : String(20);
  create_date               : Timestamp;
  create_user_key           : Integer;
  update_date               : Timestamp;
  update_user_key           : Integer;
}

entity Product {
  product_key         : Integer;
  product_number      : String(50);
  product_type_key    : String(50);
  product_status      : Integer;
  product_create_date : Integer;
  product_update_date : Timestamp;
  product_family      : Timestamp;
  product_name        : Integer;
  product_description : Integer;
}

entity Asset {
  asset_key                  : Integer;
  asset_type_key             : Integer;
  asset_status               : Integer;
  asset_name                 : String(100);
  asset_short_name           : String(100);
  asset_number               : String(50);
  asset_create_date          : Timestamp;
  asset_update_date          : Timestamp;
  asset_create_user_key      : Integer;
  asset_update_user_key      : Integer;
  asset_location_date        : Timestamp;
  asset_location_date_utc    : Timestamp;
  asset_location_country     : String(50);
  asset_location_state       : String(50);
  asset_location_city        : String(50);
  asset_location_postal_code : String(50);
  asset_location_street      : String(255);
  asset_location_alt1        : String(255);
  asset_location_alt2        : String(255);
  asset_location_latitude    : Decimal(10, 3);
  asset_location_longitude   : Decimal(10, 3);
  asset_description          : String(255);
}

entity Asset_location {
  asset_location_key         : Integer;
  asset_location_type_key    : Integer;
  asset_location_status      : Integer;
  asset_location_date        : Timestamp;
  asset_location_date_utc    : Timestamp;
  asset_location_trip_number : String(50);
  asset_location_country     : String(50);
  asset_location_state       : String(50);
  asset_location_city        : String(50);
  asset_location_street      : String(255);
  asset_location_postal_code : String(50);
  asset_location_alt1        : String(255);
  asset_location_alt2        : String(255);
  asset_location_latitude    : String(50);
  asset_location_longitude   : String(50);
  asset_key                  : Integer;
}

entity Enterprise {
  enterprise_key         : Integer;
  enterprise_number      : String(50);
  enterprise_ship_point  : Integer;
  enterprise_type_key    : Integer;
  enterprise_status      : Integer;
  enterprise_create_date : Timestamp;
  enterprise_update_date : Timestamp;
  enterprise_name        : String(100);
  enterprise_street      : String(50);
  enterprise_city        : String(50);
  enterprise_state       : String(50);
  enterprise_country     : String(50);
  enterprise_post_code   : String(50);
  enterprise_latitude    : String(50);
  enterprise_longitude   : String(50);
  enterprise_notes       : String(255);
  timezone_utc           : Decimal(10, 3);
  timezone_utc_desc      : String(100);
}

entity Asset_Attribute {
  asset_attribute_key : Integer;
  asset_key           : Integer;
  attribute_key       : Integer;
  asset_key_source    : Integer;
  attribute_value     : String(255);
  attribute_timestamp : Timestamp;
  attribute_latitude  : Decimal(10, 3);
  attribute_longitude : Decimal(10, 3);
  attribute_altitude  : Decimal(10, 3);
  attribute_user_key  : Integer;
  create_date         : Timestamp;
  update_date         : Timestamp;
}

entity Asset_Attribute_History {
  asset_attribute_key : Integer;
  asset_key           : Integer;
  attribute_key       : Integer;
  attribute_value     : Integer;
  attribute_timestamp : Timestamp;
  attribute_latitude  : Decimal;
  attribute_longitude : Decimal;
  attribute_altitude  : Integer;
  attribute_user_key  : Integer;
  asset_key_source    : Integer;
  create_date         : Date;
  update_date         : Date;
}

view Delivery as select key Delivery from innovtrack.TiveDevice;
view Device as select key DeviceName, Delivery from innovtrack.TiveDevice;
