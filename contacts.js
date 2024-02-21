import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async contactId => {
  const contacts = await listContacts();
  const updatedContacts = contacts.find(contact => contact.id === contactId);
  return updatedContacts || null;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const addedContact = { id: nanoid(), name, email, phone };
  contacts.push(addedContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
};

export const removeContact = async contactId => {
  const contacts = await listContacts();
  const deletedContact = contacts.find(contact => contact.id === contactId);

  if (deletedContact) {
    const newContactList = contacts.filter(contact => contact.id !== contactId);
    await writeFile(contactsPath, JSON.stringify(newContactList));
  }
  return deletedContact || null;
};
