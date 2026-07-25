import os
import glob

models_dir = r"c:\Users\Vansh\Desktop\InnovaHackProject\backend\app\models"

for filepath in glob.glob(os.path.join(models_dir, "*.py")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Imports
    content = content.replace("from sqlalchemy.dialects.postgresql import UUID", "")
    content = content.replace("from sqlalchemy.dialects.postgresql import JSON, UUID", "from sqlalchemy import JSON")
    
    if "from sqlalchemy import" in content and "Uuid" not in content:
        content = content.replace("from sqlalchemy import ", "from sqlalchemy import Uuid, ")
    
    # Usage
    content = content.replace("UUID(as_uuid=True)", "Uuid(as_uuid=True)")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Migration applied!")
