import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import os
import json

# URL de la página de LEEFO
url = "https://www.lefoo.com/products"

# Encabezados HTTP para la solicitud
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Realiza la solicitud GET
response = requests.get(url, headers=headers)
response.raise_for_status()

# Parse la respuesta HTML
soup = BeautifulSoup(response.text, 'html.parser')

# Encuentra todos los elementos <li> que contienen los productos
products = soup.find_all('li', class_="product")

# Crear un diccionario para almacenar los datos
data = {}

# Crear una carpeta para guardar las imágenes si no existe
if not os.path.exists('images'):
    os.makedirs('images')

# Iterar sobre los productos y extraer la información necesaria
for idx, product in enumerate(products, 1):
    thumbnail = product.find('div', class_='thumbnail_container')
    title_wrap = product.find('div', class_='title_wrap')

    if thumbnail:
        img_tag = thumbnail.find('img')
        img_url = img_tag['src'] if img_tag else None
    else:
        img_url = None

    if title_wrap:
        a_tag = title_wrap.find('a')
        if a_tag:
            h2_tag = a_tag.find('h2')
            title = h2_tag.text.strip() if h2_tag else "No Title"
        else:
            title = "No Title"
    else:
        title = "No Title"

    if img_url:
        # Descargar la imagen con encabezados
        img_response = requests.get(img_url, headers=headers)
        img_response.raise_for_status()

        # Detectar la extensión de la imagen
        img_extension = os.path.splitext(img_url)[-1].lower()

        if img_extension == '.jpg' or img_extension == '.jpeg':
            # Guardar la imagen como jpg y luego convertir a png
            img = Image.open(BytesIO(img_response.content))
            jpg_filename = f'images/leefo{idx}.jpg'
            img.save(jpg_filename)

            # Convertir a PNG directamente
            img = Image.open(jpg_filename)
            png_filename = f'images/leefo{idx}.png'
            img.save(png_filename, 'PNG')

            # Eliminar la imagen jpg ya convertida
            os.remove(jpg_filename)
        elif img_extension == '.png':
            # Guardar la imagen directamente como PNG
            png_filename = f'images/leefo{idx}.png'
            img = Image.open(BytesIO(img_response.content))
            img.save(png_filename)

        # Añadir los datos al diccionario
        data[f'leefo{idx}'] = {
            'title': title,
            'imgURL': img_url
        }
    else:
        print(f"Imagen no encontrada para el producto {idx}")

# Guardar los datos en formato JSON
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Datos extraídos y guardados correctamente.")