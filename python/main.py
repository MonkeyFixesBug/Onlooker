from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import data_processor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 全局变量
csv_filename = None

@app.post("/process")
async def process_data(data: dict):
    global csv_filename

    try:
        if csv_filename is None:
            csv_filename = data_processor.create_csv_file()
            print(f"创建CSV文件: {csv_filename}")

        success = data_processor.process_and_save_data(data, csv_filename)

        if success:
            return {"status": "success", "message": "数据已处理并保存到CSV"}
        else:
            return {"status": "error", "message": "数据处理失败"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000) 