const fs = require ('fs/promises')
const path = require('path')
const uuid = require('uuid')

const readContent = async() => {
    const content = await fs.readFile(path.join(__dirname, 'db/contact.json'), 'utf-8')
    const result = JSON.parse(content)
    return result
}
async function listContacts() {
    return await readContent()
  }
  
  async function getContactById(contactId) {
    const contacts = await readContent()
    const result = contacts.find(c => c.id === contactId)
    return result 
  }
  
  async function removeContact(contactId) {
    const contacts = await readContent();
    const removedContact = contacts.find(contact => contact.id === contactId);
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(path.join(__dirname, 'db/contact.json'), JSON.stringify(newContacts, null, 2));
    return removedContact;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await readContent()
    const newContact = {id : uuid.v4(), name, email, phone}
    contacts.push(newContact)
    await fs.writeFile(path.join(__dirname, 'db/contact.json'), JSON.stringify(contacts, null,2))
    return newContact
  }

  module.exports = {listContacts, getContactById, removeContact, addContact}