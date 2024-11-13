import os
from pathlib import Path
from shutil import copy2
import re

def obtener_ultimo_numero(carpeta_salida, prefijo):
    """
    Obtiene el último número usado en la carpeta de salida para el prefijo dado.
    
    Args:
        carpeta_salida (str): Ruta de la carpeta donde están las imágenes renombradas
        prefijo (str): Prefijo usado para los nombres de archivo
    
    Returns:
        int: El último número usado o 0 si no hay archivos
    """
    ultimo_numero = 0
    if os.path.exists(carpeta_salida):
        # Patrón para buscar archivos con el formato prefijo_numero.extension
        patron = re.compile(f"{prefijo}_(\\d+)\\.[a-zA-Z]+$")
        
        for archivo in os.listdir(carpeta_salida):
            match = patron.match(archivo)
            if match:
                numero = int(match.group(1))
                ultimo_numero = max(ultimo_numero, numero)
    
    return ultimo_numero

def renombrar_imagenes(carpeta_entrada, carpeta_salida, prefijo="vidrio"):
    """
    Renombra las imágenes de una carpeta de entrada y las guarda en una carpeta de salida
    con un formato estandarizado, continuando la numeración desde el último número usado.
    
    Args:
        carpeta_entrada (str): Ruta de la carpeta que contiene las imágenes originales
        carpeta_salida (str): Ruta de la carpeta donde se guardarán las imágenes renombradas
        prefijo (str): Prefijo para el nuevo nombre de las imágenes
    """
    try:
        # Crear la carpeta de salida si no existe
        Path(carpeta_salida).mkdir(parents=True, exist_ok=True)
        
        # Obtener el último número usado
        numero_inicio = obtener_ultimo_numero(carpeta_salida, prefijo) + 1
        print(f"Comenzando la numeración desde: {numero_inicio}")
        
        # Extensiones de imagen comunes
        extensiones_imagen = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
        
        # Obtener lista de archivos de imagen en la carpeta de entrada
        imagenes = [
            f for f in os.listdir(carpeta_entrada)
            if os.path.isfile(os.path.join(carpeta_entrada, f)) and 
            os.path.splitext(f.lower())[1] in extensiones_imagen
        ]
        
        # Contador de imágenes procesadas
        imagenes_procesadas = 0
        
        # Renombrar y copiar cada imagen
        for i, imagen in enumerate(imagenes, numero_inicio):
            # Obtener la extensión original del archivo
            extension = os.path.splitext(imagen)[1]
            
            # Crear el nuevo nombre
            nuevo_nombre = f"{prefijo}_{i}{extension}"
            
            # Rutas completas
            ruta_origen = os.path.join(carpeta_entrada, imagen)
            ruta_destino = os.path.join(carpeta_salida, nuevo_nombre)
            
            # Verificar si el archivo de destino ya existe
            if os.path.exists(ruta_destino):
                print(f"Advertencia: El archivo {nuevo_nombre} ya existe, se omitirá.")
                continue
            
            # Copiar el archivo con el nuevo nombre
            copy2(ruta_origen, ruta_destino)
            print(f"Imagen renombrada: {imagen} -> {nuevo_nombre}")
            imagenes_procesadas += 1
        
        print(f"\nProceso completado. Se renombraron {imagenes_procesadas} imágenes.")
        print(f"Último número utilizado: {numero_inicio + imagenes_procesadas - 1}")
        
    except Exception as e:
        print(f"Error durante el proceso: {e}")

def main():
    # Obtener la ruta del directorio donde está el script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Definir las rutas de las carpetas de entrada y salida relativas al script
    carpeta_entrada = os.path.join(script_dir, 'carpeta_entrada')
    carpeta_salida = os.path.join(script_dir, 'carpeta_salida')
    
    try:
        # Verificar si existe la carpeta de entrada
        if not os.path.exists(carpeta_entrada):
            print(f"La carpeta de entrada no existe. Creándola en: {carpeta_entrada}")
            Path(carpeta_entrada).mkdir(parents=True, exist_ok=True)
            print("Por favor, coloca las imágenes en la carpeta_entrada y ejecuta el script nuevamente.")
            return
            
        # Verificar si la carpeta de entrada está vacía
        if not os.listdir(carpeta_entrada):
            print("La carpeta de entrada está vacía. Por favor, agrega algunas imágenes.")
            return
            
        renombrar_imagenes(carpeta_entrada, carpeta_salida)
        
    except Exception as e:
        print(f"Error en el programa: {e}")

if __name__ == "__main__":
    main()