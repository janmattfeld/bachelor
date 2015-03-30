FUNCTION z_scrumui5_read_projekte.
*"----------------------------------------------------------------------
*"*"Lokale Schnittstelle:
*"  IMPORTING
*"     VALUE(KUNDEN) TYPE  ZAV\_DE\_KUNDE
*"     VALUE(PROJEKT) TYPE  ZAV\_DE\_PROJEKT OPTIONAL
*"     VALUE(SUBSTRING\_BEZEI) TYPE  STRING OPTIONAL
*"  TABLES
*"      PROJEKTE STRUCTURE  ZAV\_PROJEKTE
*"----------------------------------------------------------------------
  DATA: wa_projekte LIKE LINE OF projekte.
  "Übergabe Kunde - Alle Projekte eines Kunden (Nur Kunde)
  IF kunden <> '' AND projekt = '' AND substring_bezei = ''.
    SELECT * FROM zav_projekte
      JOIN zav_rechte ON zav_projekte~projekt = zav_rechte~projekt
      AND zav_projekte~kunde = zav_rechte~kunde
      INTO  CORRESPONDING FIELDS OF TABLE projekte
      WHERE zav_rechte~benutzer  = sy-uname
      AND zav_projekte~kunde  = kunden
    "Übergabe Kunde und Projekt - Ein bestimmtes Projekt
  ELSEIF kunden <> '' AND projekt <> '' AND substring_bezei = ''.
    SELECT * FROM zav_projekte
        JOIN zav_rechte ON zav_projekte~projekt = zav_rechte~projekt
        AND zav_projekte~kunde = zav_rechte~kunde
        INTO  CORRESPONDING FIELDS OF TABLE projekte
        WHERE zav_rechte~benutzer  = sy-uname
        AND zav_projekte~kunde 	= kunden
        AND zav_projekte~projekt = projekt
    "Übergabe Kunde und Substring - Alle Projekte mit Substring in Bezeichnung
  ELSEIF kunden <> '' AND projekt = '' AND substring_bezei <> ''.
    SELECT * FROM zav_projekte
       JOIN zav_rechte ON zav_projekte~projekt = zav_rechte~projekt
       AND zav_projekte~kunde = zav_rechte~kunde
       INTO  CORRESPONDING FIELDS OF TABLE projekte
       WHERE zav_rechte~benutzer  = sy-uname
       AND zav_projekte~kunde = kunden.
    LOOP AT projekte INTO wa_projekte.
      SEARCH wa_projekte-bezei FOR substring_bezei .
      IF sy-subrc <> '0'.
        DELETE TABLE  projekte FROM wa_projekte.  
      ENDIF.
    ENDLOOP.
  ENDIF.
ENDFUNCTION.