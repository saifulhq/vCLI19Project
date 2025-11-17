import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../config/data.json';
import s from '../styles';

const BtnComp = (props) => {

    const { type, text, children, style, outline, icon, ...otherProps } = props;
    const buttonStyles = [icon ? styles.buttonIcon : styles.button];
    const textStyles = [styles.buttonText];

    const renderChildren = () => {
        if (children) {
            return (<Text style={textStyles}>{children}</Text>)
        } else {
            return (<Text style={textStyles}>{text || ''}</Text>)
        }
    }

    if (type) {
        buttonStyles.push(styles[`${type}Button`]);
        textStyles.push(styles[`${type}Text`]);

        if (outline) {
            buttonStyles.push(s.b1);
            buttonStyles.push(styles.btnTransparent);
            buttonStyles.push({ borderColor: colors[type] });

            textStyles.push({ color: colors[type] })
            buttonStyles.push({ color: colors[type] });

            if (type == "light") {
                buttonStyles.push({ borderColor: colors.dark });
                textStyles.push({ color: colors.dark })
                buttonStyles.push({ color: colors.dark });
            }
        }
    } else {
        buttonStyles.push(styles.secondaryButton);
        textStyles.push(styles.secondaryText);
    }

    // Merge custom styles if provided
    if (style) {
        buttonStyles.push(style);
    }

    return (
        <TouchableOpacity style={buttonStyles} {...otherProps}>
            {renderChildren()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    buttonIcon: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnTransparent: {
        backgroundColor: 'transparent'
    },

    primaryButton: {
        backgroundColor: colors.primary
    },
    primaryText: {
        color: '#fff',
    },

    successButton: {
        backgroundColor: colors.success
    },
    successText: {
        color: '#fff',
    },

    dangerButton: {
        backgroundColor: colors.danger
    },
    dangerText: {
        color: '#fff',
    },

    secondaryButton: {
        backgroundColor: colors.secondary
    },
    secondaryText: {
        color: '#fff',
    },

    warningButton: {
        backgroundColor: colors.warning
    },
    warningText: {
        color: '#000',
    },

    infoButton: {
        backgroundColor: colors.info
    },
    infoText: {
        color: '#FFF',
    },

    lightButton: {
        backgroundColor: colors.light
    },
    lightText: {
        color: '#000',
    },

    darkButton: {
        backgroundColor: colors.dark
    },
    darkText: {
        color: '#FFF',
    },
})

export default BtnComp;