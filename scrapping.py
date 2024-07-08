import requests
from bs4 import BeautifulSoup
import json
import os

# URL de la página
url = 'https://orarecolte.com.mx/filtraciones/'

# Encabezados HTTP para la solicitud
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Enviamos una petición GET a la URL con los encabezados
response = requests.get(url, headers=headers)

# Verificamos el estado de la respuesta
if response.status_code != 200:
    print(f"Error: No se pudo acceder a la página. Código de estado: {response.status_code}")
else:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Obtenemos todos los 'figure'
    figures = soup.find_all('figure')

    # Inicializamos el diccionario para almacenar los datos
    filtros_data = {}

    # Imprimir estructuras para debugging
    print(f"Total 'figure' elements found: {len(figures)}")

    # Recorrer cada 'figure' a partir del segundo
    for index, figure in enumerate(figures[0:], start=1):  # Comenzamos el index desde 1
        img_tag = figure.find('img')
        div_tag = figure.find('div', class_='wp-block-uagb-image--layout-overlay__inner center-center')
        title_tag = div_tag.find('h2') if div_tag else None
        
        # Debug cada elemento encontrado
        print(f"\nFigure {index}:")
        print(f"IMG Tag: {img_tag}")
        print(f"DIV Tag: {div_tag}")
        print(f"Title Tag: {title_tag}")
        
        if img_tag and title_tag:
            img_url = img_tag['src']
            title = title_tag.get_text(strip=True)
            
            # Descargar la imagen
            img_response = requests.get(img_url, headers=headers)
            img_name = f'filtro{index}.png'
            with open(img_name, 'wb') as img_file:
                img_file.write(img_response.content)
            
            # Guardar los datos en el diccionario
            filtros_data[f'filtro{index}'] = {
                'title': title,
                'imgURL': img_url
            }

    # Guardar el diccionario como JSON utilizando utf-8
    with open('filtros_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(filtros_data, json_file, ensure_ascii=False, indent=4)

    print('Datos y descargas completados correctamente.')