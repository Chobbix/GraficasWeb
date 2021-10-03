class Player {
    constructor(vida, velocidad, poder, isAlive) {
        this.vida = vida;
        this.velocidad = velocidad;
        this.poder = poder;
        this.isAlive = isAlive;
    }

    setVida(vida) {
        this.vida = vida;
    }

    getVida() {
        return this.vida;
    }

    getVelocidad() {
        return this.velocidad;
    }

    aumentarVelocidad(velocidad) {
        this.velocidad += velocidad;
    }

    aumentarPoder(poder) {
        this.poder += poder;
    }

    getIsAlive() {
        return this.isAlive;
    }

    morir() {
        this.isAlive = false;
        this.vida = 0;
    }

    hacerDaño() {
        return this.poder;
    }

    recibirDaño(daño) {
        this.vida -= daño;
    }
}