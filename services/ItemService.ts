import { Item } from '../models/Item';

class ItemService {
  private items: Item[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
  ];

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(name: string): void {
    const nameTrim = name.trim();
    if(nameTrim.length <= 2){
      throw new Error("O nome do item deve ter mais de 2 caracteres");
    }
    const isCloned = this.items.some((item) => 
      item.name.toLowerCase() === nameTrim.toLowerCase()
    );
    if (isCloned) {
      throw new Error("Este item já existe na lista.");
    } 
    const newItem: Item = {
      id: Date.now().toString(),
      name: name,
    };
    this.items.push(newItem);
  }
}

export default new ItemService();