export const createPostValidationSchema = {
    header: {
        isLength: {
            options: { max: 25 },
            errorMessage: "The 'header' must be maximum 25 charaters"
        },
        notEmpty: {
            errorMessage: "You must have at least 1 character in the 'header"
        }
    },
    content: {
        isLength: {
            options: { max: 250 },
            errorMessage: "Your 'content' must not exceed 250 characters"
        },
        notEmpty: {
            errorMessage: "You must have at least 1 character in your 'content'!"
        }
    },
    tag: {
        optional: true,
        matches: {
            options: /^#[^\s]+$/,
            errorMessage: 'Tag must start with "#" and have at least one character after it',
        },
        isLength: {
            options: {
                min: 2,
                max: 15
            },
            errorMessage: "Your 'hashtag' must be between 2-15 characters long including #"
        }
    },
    postImg: {
        optional: true,
        matches: {
            options: [/^(https?:\/\/.*\.(?:png|jpg))$/i, /^(\.\.\/|\/)[\w-\/]+$/],
            errorMessage: 'The URL must point to a PNG or JPG image',
        },
    }
}

/* https://regex101.com/ // för att kontrollera regex */