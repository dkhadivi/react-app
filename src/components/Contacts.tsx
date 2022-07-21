import React, { useState } from "react";

enum ContactTypeEnum {
    Personal = 1,
    Work
}

interface Contact {
    id: number,
    name: string,
    email: string,
    type: ContactTypeEnum
}

const contactList: Contact[] = [
    {
        id: 1,
        name: "Ben",
        email: "bbrown@yahoo.com",
        type: ContactTypeEnum.Personal
    },
    {
        id: 2,
        name: "Chris",
        email: "canderson@gmail.com",
        type: ContactTypeEnum.Personal
    },
    {
        id: 3,
        name: "Jane",
        email: "jsmith@ee.net",
        type: ContactTypeEnum.Work
    },
    {
        id: 4,
        name: "Fred",
        email: "fflintstone@rockland.com",
        type: ContactTypeEnum.Work
    }
];

const Contacts: React.FC = (): JSX.Element => {
    const [contactType, setContactType] = useState(ContactTypeEnum.Personal);

    const handleButtonPersonal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setContactType(ContactTypeEnum.Personal);
        setSelected(event.currentTarget)
    }

    const setSelected = (button: HTMLButtonElement) => {
        // Remove the 'selected' CSS class from the buttons.
        document.querySelectorAll('.contacts__button').forEach((el) => {
            el.classList.remove('selected');
        });

        button.classList.add('selected');
    }

    return(
        <div className="contacts">
            <h2 className="contacts__title">Contacts</h2>
            <div className="contacts__button-container">
                <button className="contacts__button" onClick={handleButtonPersonal}>Personal</button>
                <button className="contacts__button" onClick={() => setContactType(ContactTypeEnum.Work)}>Work</button>
            </div>
            <div className="contacts__contact-list">
                {
                contactList.map(contact => {
                    if(contact.type === contactType) {
                        return (
                            <div className="contacts__contact" key={contact.id}>{contact.name}:&nbsp;{contact.email}&nbsp;[{ContactTypeEnum[contact.type]}]</div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Contacts;