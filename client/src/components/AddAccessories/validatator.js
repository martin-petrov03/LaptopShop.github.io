const isCorrect = (title, url, description, price) => {
    if(title && title.length >= 5 && title.length <= 20) {
        if(url && url.length >= 5 && url.startsWith('http')) {
            if(description && description.length >= 10) {
                if(price && price >= 0.01  && price <= 9999.99) {
                    return '';
                } else {
                    return 'Invalid price!';
                }
            } else {
                return 'Description should be at least 10 characters!';
            }
        } else {
            return 'Invalid url!';
        }
    } else {
        return 'Title should be between 5 and 20 characters!';
    }
};

export default isCorrect;