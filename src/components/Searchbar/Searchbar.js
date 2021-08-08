import React, { useState } from 'react';

import styles from './searchbar.module.css'

export default function Searchbar({ inputSubmit }) {
    const [name, setName] = useState('');

    const handleChange = (evt) => {
        const { value } = evt.currentTarget;
        setName(value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (name.trim() === "") {
            alert('Enter search request');
            return;
        }

        inputSubmit(name);
    }

    return (
        <header className={styles.Searchbar}>
            <form onSubmit={handleSubmit} className={styles.SearchForm}>
                <button type="submit" className={styles.SearchForm_button}>
                    <span className={styles.SearchForm_button_label}>Search</span>
                </button>
                
                <input
                className={styles.SearchForm_input}
                type="text"
                value={name}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                required                    
                />            
            </form>
        </header>  
    );
}