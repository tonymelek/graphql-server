export const camelToSentence = camel => {
    const spacedLoweCase = camel.replace(/([A-Z])/g, " $&").toLowerCase();
    return `${spacedLoweCase[0].toUpperCase()}${spacedLoweCase.slice(1)}`;
}

export const moneyFormat = field => {
    if (typeof field === 'number') return `$${field.toFixed(2)}`
    return field
}