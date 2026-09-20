import { useEffect, useMemo, useRef, useState } from 'react';

function GroupBuyCategorySelect({ categories = [], value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const rootRef = useRef(null);

    const selectedCategory = categories.find(
        (category) => String(category.id) === String(value),
    );

    const filteredCategories = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLocaleLowerCase();
        if (!normalizedKeyword) return categories;

        return categories.filter((category) =>
            category.name.toLocaleLowerCase().includes(normalizedKeyword),
        );
    }, [categories, keyword]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelect = (categoryId) => {
        onChange(String(categoryId));
        setKeyword('');
        setIsOpen(false);
    };

    return (
        <div className="category_picker" ref={rootRef}>
            <button
                type="button"
                className={`category_picker_trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span>{selectedCategory?.name ?? 'すべてのカテゴリー'}</span>
                <span className="category_picker_arrow" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className="category_picker_panel">
                    <input
                        type="search"
                        className="category_picker_search"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="カテゴリーを検索"
                        autoFocus
                    />

                    <div className="category_picker_list" role="listbox">
                        <button
                            type="button"
                            className={`category_picker_option ${value === '' ? 'active' : ''}`}
                            onClick={() => handleSelect('')}
                        >
                            すべてのカテゴリー
                        </button>

                        {filteredCategories.map((category) => (
                            <button
                                type="button"
                                className={`category_picker_option ${String(category.id) === String(value) ? 'active' : ''}`}
                                key={category.id}
                                onClick={() => handleSelect(category.id)}
                                role="option"
                                aria-selected={String(category.id) === String(value)}
                            >
                                {category.name}
                            </button>
                        ))}

                        {filteredCategories.length === 0 && (
                            <p className="category_picker_empty">該当するカテゴリーがありません。</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupBuyCategorySelect;
