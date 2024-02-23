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
  const updatedContact = contacts.find(contact => contact.id === contactId);
  return updatedContact || null;
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
  const deletedContactIndex = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (deletedContactIndex !== -1) {
    const [deletedContact] = contacts.splice(deletedContactIndex, 1);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  }

  return null;
};
