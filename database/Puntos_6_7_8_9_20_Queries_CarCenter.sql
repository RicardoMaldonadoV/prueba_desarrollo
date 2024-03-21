-- 6. Consulta de Clientes que han comprado un acumulado $100.000 en los ultimos 60 dias
SELECT C.P_NOMBRE||' '||C.s_NOMBRE||' '||C.P_APELLIDO||' '||C.S_APELLIDO AS NOMBRE_CLIENTE,
       C.DOCUMENTO,
       SUM(F.TOTAL) ACUM_MAYOR_100
  FROM CLIENTE C
 INNER JOIN FACTURA F
    ON C.ID_CLIENTE = F.ID_CLIENTE
 WHERE 1=1
  AND F.FECHA_FACTURA >= (SELECT SYSDATE -60 FROM DUAL) -- En los ultimos 60 dias 
 GROUP BY (C.P_NOMBRE,C.S_NOMBRE,C.P_APELLIDO,C.S_APELLIDO,C.DOCUMENTO)
HAVING SUM(F.TOTAL) > 100000 -- Solo los cliente que acumularon mas de 100K
;  

-- 7. Consulta de los 100 productos mas vendidos en los ultimos 30 dias
SELECT *
  FROM (
    SELECT 
      P.DESCRIPCION AS "TOP_100_NOMBRE_PRODUCTO", 
      P.ID_PRODUCTO,
      (SELECT SUM(MP.CANTIDAD) 
         FROM MANTENIMIENTO_PRODUCTO MP 
        INNER JOIN FACTURA F
           ON MP.ID_MANTENIMIENTO = F.ID_MANTENIMIENTO
        WHERE MP.ID_PRODUCTO = P.ID_PRODUCTO
          AND F.FECHA_FACTURA >= (SELECT SYSDATE -30 FROM DUAL) -- En los ultimos 30 dias
      ) AS CANTIDADES_VENDIDAS
    FROM PRODUCTO P
    --WHERE 
  ORDER BY CANTIDADES_VENDIDAS DESC
  )
WHERE 1=1
  AND rownum <= 100 -- Top 100
  AND CANTIDADES_VENDIDAS IS NOT NULL -- Descarta los que no tienen ventas
;

--8. Consulta de las tiendas que han vendido mas de 100 UND del producto 100 en los ultimos 60 dias.
SELECT T.ID_TIENDA, R.ID_PRODUCTO, SUM(MR.CANTIDAD) CANTIDAD_VENDIDA
  FROM TIENDA T
 INNER JOIN FACTURA F
    ON T.ID_TIENDA = F.ID_FACTURA
 INNER JOIN MANTENIMIENTO_PRODUCTO MR 
    ON MR.ID_MANTENIMIENTO = F.ID_MANTENIMIENTO
 INNER JOIN PRODUCTO R
    ON R.ID_PRODUCTO = MR.ID_PRODUCTO
 WHERE 1=1
   AND R.ID_PRODUCTO IN (SELECT ID_PRODUCTO -- Subconsulta productos 100 mas vendidos
                      FROM (
                        SELECT  
                          R.ID_PRODUCTO,
                          (SELECT SUM(MR.CANTIDAD) 
                             FROM MANTENIMIENTO_PRODUCTO MR 
                            INNER JOIN FACTURA F
                               ON MR.ID_MANTENIMIENTO = F.ID_MANTENIMIENTO
                            WHERE R.ID_PRODUCTO = MR.ID_PRODUCTO 
                              AND F.FECHA_FACTURA >= (SELECT SYSDATE -30 FROM DUAL) -- En los ultimos 30 dias 
                          ) AS CANTIDADES_VENDIDAS
                        FROM PRODUCTO R
                      ORDER BY CANTIDADES_VENDIDAS DESC
                      )
                    WHERE rownum <= 100)
 GROUP BY T.ID_TIENDA, R.ID_PRODUCTO
HAVING SUM(MR.CANTIDAD) > 100 -- Solo las tiendas que vendieron m�s de 100 unidades
;

--9. Consulta de todos los clientes que han tenido mas de un mantenimento en los ultimos 30 dias.
SELECT C.P_NOMBRE||' '||C.S_NOMBRE||' '||C.P_APELLIDO||' '||C.S_APELLIDO AS NOMBRE_CLIENTE,
       C.DOCUMENTO,
       COUNT(MS.ID_SERVICIO) NUM_MANTENIMIENTOS
  FROM CLIENTE C
 INNER JOIN FACTURA F
    ON C.ID_CLIENTE = F.ID_CLIENTE
 INNER JOIN MANTENIMIENTO_SERVICIO MS
    ON MS.ID_MANTENIMIENTO = F.ID_MANTENIMIENTO
 WHERE 1=1
 AND F.FECHA_FACTURA >= (SELECT SYSDATE -30 FROM DUAL) -- En los ultimos 30 dias 
 GROUP BY (C.P_NOMBRE,C.S_NOMBRE,C.P_APELLIDO,C.S_APELLIDO,C.DOCUMENTO)
HAVING COUNT(MS.ID_SERVICIO) > 1 -- Solo los cliente que han tenido mas de un servicio
;  

--10. Procedimiento que reste la cantidad de productos del inventario de las tiendas cada que se presente una venta.
-- Solución con Trigger
CREATE OR REPLACE TRIGGER TRIGGER_INVENTARIO_ACTUALIZAR_STOCK
    AFTER INSERT ON MANTENIMIENTO_PRODUCTO FOR EACH ROW -- El inventario se modifica desde el momento en que se aparta el producto para el mantenimiento
DECLARE
    V_AJUSTE NUMBER(2); -- Cantidades a restar
    v_STOCK INVENTARIO.STOCK%TYPE; -- Stock actual 
BEGIN
    SELECT I.STOCK INTO V_STOCK -- Obtiene el stock actual en inventario según la tienda en donde se está realizando el mantenimiento
      FROM INVENTARIO I
     WHERE I.ID_PRODUCTO = :NEW.ID_PRODUCTO
       AND I.ID_TIENDA IN (SELECT M.ID_TIENDA FROM MANTENIMIENTO M WHERE M.ID_MANTENIMIENTO = :NEW.ID_MANTENIMIENTO)
       ; -- Subconsulta que obtiene la tieda de la tabla mantenimiento
    IF (V_STOCK - :NEW.CANTIDAD) > 0 THEN -- Valido que la resta del stock no de ceros (en este punto se podría crear otro registro para guardar valores negativos y tener control de ello)
     UPDATE INVENTARIO I
     SET I.STOCK = I.STOCK - :NEW.CANTIDAD
     WHERE I.ID_PRODUCTO = :NEW.ID_PRODUCTO;
    ELSE 
     UPDATE INVENTARIO I
     SET I.STOCK = 0
     WHERE I.ID_PRODUCTO = :NEW.ID_PRODUCTO;
    END IF;
END;
/
-- Solución con PRC
CREATE OR REPLACE PROCEDURE PRC_INVENTARIO_ACTUALIZAR_STOCK (ID_PRODUCTO IN VARCHAR2, V_AJUSTE IN NUMBER, ID_MANTENIMIENTO) -- RECIBE CANTIDAD Y ID PRODUCTO/MANTENIMIENTO
 v_STOCK INVENTARIO.STOCK%TYPE; -- Stock actual 
BEGIN 
    SELECT I.STOCK INTO V_STOCK -- Obtiene el stock actual en inventario según la tienda en donde se está realizando el mantenimiento
      FROM INVENTARIO I
     WHERE I.ID_PRODUCTO = :ID_PRODUCTO
       AND I.ID_TIENDA IN (SELECT M.ID_TIENDA FROM MANTENIMIENTO M WHERE M.ID_MANTENIMIENTO = :ID_MANTENIMIENTO)
       ; -- Subconsulta que obtiene la tieda de la tabla mantenimiento
    IF (V_STOCK - :CANTIDAD) > 0 THEN -- Valido que la resta del stock no de ceros (en este punto se podría crear otro registro para guardar valores negativos y tener control de ello)
     UPDATE INVENTARIO I
     SET I.STOCK = I.STOCK - :CANTIDAD
     WHERE I.ID_PRODUCTO = :ID_PRODUCTO;
    ELSE 
     UPDATE INVENTARIO I
     SET I.STOCK = 0
     WHERE I.ID_PRODUCTO = :ID_PRODUCTO;
    END IF;
END;
/