import csv
import os
from datetime import datetime

csv_filename = None

def create_csv_file() -> str:
    """创建CSV文件用于存储数据"""
    os.makedirs('data', exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'data/taobao_data_{timestamp}.csv'

    with open(filename, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(['商品标题', '店铺名称', '商品图片', '价格'])

    return filename

def process_and_save_data(data: dict, filename: str) -> bool:
    """处理并保存数据到CSV文件"""
    try:
        data_content = data.get('data')
        if not data_content:
            print("未找到data字段")
            return False

        items = data_content.get('itemsArray')
        if not items:
            print("未找到itemsArray字段")
            return False

        with open(filename, 'a', newline='', encoding='utf-8-sig') as f:
            writer = csv.writer(f)

            for item in items:
                title = item.get('title', '')
                shop_title = item.get('shopInfo', {}).get('title', '')
                pic_path = item.get('pic_path', '')
                price = item.get('priceShow', {}).get('price', '')

                writer.writerow([title, shop_title, pic_path, price])

                print(f"商品: {title}")
                print(f"店铺: {shop_title}")
                print(f"图片: {pic_path}")
                print(f"价格: {price}")
                print("-" * 50)
        return True
    except Exception as e:
        print(f"处理数据时出错: {str(e)}")
        return False 