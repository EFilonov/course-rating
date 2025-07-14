'use server';

import { API } from "../api/api";
import { Menu } from "../dbSchemas/menuSchema";
import { MenuItem } from "../interfaces/menu.interface";
import { httpService } from "../services/httpService";


const { request } = httpService();

export async function menuAction(firstCategory: number): Promise<MenuItem[]> {
  
  // Пытаемся найти данные в базе
  const doc = await Menu.findOne({ firstCategory });
  if (doc && doc.menu.length) {
    return doc.menu as MenuItem[];
  }

  // Если нет — делаем внешний запрос
  const menu = await request(API.topPage.find, 'POST', JSON.stringify({ firstCategory }));

  // Сохраняем в базу
  await Menu.create({ firstCategory, menu });

  return menu as MenuItem[];
}