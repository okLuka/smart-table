import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                let option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === 'clear') {
            const wrapper = action.closest('.filter');                     
            const input = wrapper?.querySelector('select, input');         
            if (input) {
                input.value = '';                                          
                const field = action.dataset.field;                       
                if (field) {
                    state[field] = '';
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}