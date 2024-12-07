package com.lucas.fuel.LucasRent.model;

public enum NivelGasolina {
    VACIO(0),
    CUARTO(1),
    MEDIO(2),
    TRES_CUARTOS(3),
    LLENO(4);

    private final int nivel;

    NivelGasolina(int nivel) {
        this.nivel = nivel;
    }

    public int getNivel() {
        return nivel;
    }
} 