METHOD kunden_get_entityset.
DATA:  ls_headerdata TYPE zav_kunden,
    lt_headerdata TYPE STANDARD TABLE OF zav_kunden,
    ls_project LIKE LINE OF et_entityset.

DATA:  ls_filter_select_options TYPE /iwbep/s_mgw_select_option,
    ls_select_option TYPE /iwbep/s_cod_select_option,
    ivfiltersubstring TYPE string.

LOOP AT it_filter_select_options INTO ls_filter_select_options.
  IF ls_filter_select_options-property EQ 'Bezei' 
  OR ls_filter_select_options-property EQ 'Kunde'.
    LOOP AT ls_filter_select_options-select_options INTO ls_select_option.
      IF  ls_select_option-option = 'CP'.
        ivfiltersubstring = ls_select_option-low.
      ENDIF.
    ENDLOOP.
  ENDIF.
ENDLOOP.

REPLACE ALL OCCURRENCES OF '*' IN ivfiltersubstring WITH ''.

CALL FUNCTION 'Z_SCRUMUI5_READ_KUNDEN'
  EXPORTING
    substring_bezei = ivfiltersubstring
  TABLES
    kunden    = lt_headerdata.

LOOP AT lt_headerdata INTO ls_project.
  APPEND ls_project TO et_entityset.
ENDLOOP.

ENDMETHOD.