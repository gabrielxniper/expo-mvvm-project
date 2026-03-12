import { useState, useEffect } from 'react';
import { Item } from '../models/Item';
import ItemService from '../services/ItemService';

export class ItemViewModel {
  private _items: Item[] = [];
  private _dialogVisible: boolean = false;
  private _inputText: string = '';
  
  private setItemsCallback: ((items: Item[]) => void) | null = null;
  private setDialogVisibleCallback: ((visible: boolean) => void) | null = null;
  private setInputTextCallback: ((text: string) => void) | null = null;

  // Getters para acessar o estado
  get items(): Item[] {
    return this._items;
  }

  get dialogVisible(): boolean {
    return this._dialogVisible;
  }

  get inputText(): string {
    return this._inputText;
  }

  // Métodos para definir callbacks da View
  setItemsListener(callback: (items: Item[]) => void) {
    this.setItemsCallback = callback;
  }

  setDialogVisibleListener(callback: (visible: boolean) => void) {
    this.setDialogVisibleCallback = callback;
  }

  setInputTextListener(callback: (text: string) => void) {
    this.setInputTextCallback = callback;
  }

  // Métodos de negócio
  loadItems(): void {
    this._items = ItemService.getAllItems();
    this.setItemsCallback?.(this._items);
  }

  addItem(): void {
      ItemService.addItem(this._inputText.trim());
      this.loadItems();
      this.setInputText('');
      this.closeDialog();
  }

  openDialog(): void {
    this._dialogVisible = true;
    this.setDialogVisibleCallback?.(this._dialogVisible);
  }

  closeDialog(): void {
    this._dialogVisible = false;
    this.setDialogVisibleCallback?.(this._dialogVisible);
  }

  setInputText(text: string): void {
    this._inputText = text;
    this.setInputTextCallback?.(this._inputText);
  }
}

// Hook para conectar ViewModel com View
export const useItemViewModel = () => {
  const [viewModel] = useState(() => new ItemViewModel());
  const [items, setItems] = useState<Item[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    // Conecta os listeners do ViewModel com os estados da View
    viewModel.setItemsListener(setItems);
    viewModel.setDialogVisibleListener(setDialogVisible);
    viewModel.setInputTextListener(setInputText);
    
    // Carrega os dados iniciais
    viewModel.loadItems();
  }, [viewModel]);

  return {
    viewModel,
    items,
    dialogVisible,
    inputText,
  };
};