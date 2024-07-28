import requests
from bs4 import BeautifulSoup
import json
from PIL import Image
from io import BytesIO

# Función para convertir las imágenes a PNG
def convert_image_to_png(img_url, img_name):
    response = requests.get(img_url)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGBA')  # Asegurarse de que la imagen se convierta a RGBA
    png_img_name = img_name + '.png'
    img.save(png_img_name, 'PNG')
    return png_img_name

# URL de la página de LEEFO
url = "https://www.lefoo.com/products"

# Encabezados HTTP para la solicitud
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Realiza la solicitud GET
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, 'html.parser')

# Encontrar todos los elementos con la clase product_page_application

product_list = soup.find('div', id_='product_page_list')
products = soup.find_all('div', class_='product_page_application')
print(product_list)
# Diccionario para almacenar los datos extraídos
ebaa_data = {}

# Contador para los nombres de archivos
counter = 1

for product in products:
    # Extraer la URL de la imagen
    img_wrapper = product.find('div', class_='product_image_wrapper')
    img_tag = img_wrapper.find('a').find('img')
    img_url = img_tag['src']
    
    # Verificar si es jpg o png y convertirla a PNG si es necesario
    if img_url.endswith('.jpg') or img_url.endswith('.jpeg'):
        img_name = f'ebaa{counter}'
        img_png_url = convert_image_to_png(img_url, img_name)
    else:
        img_png_url = img_url

    # Extraer el título del producto
    app_title = product.find('div', class_='application_title')
    title_tag = app_title.find('a').find('h3')
    title_text = title_tag.text.strip()

    # Almacenar en el diccionario
    ebaa_data[f'ebaa{counter}'] = {
        "title": title_text,
        "imgURL": img_png_url
    }

    counter += 1

# Guardar los datos en un archivo JSON
with open('ebaa_data.json', 'w') as json_file:
    json.dump(ebaa_data, json_file, indent=4)

print("Datos extraídos y guardados en ebaa_data.json")