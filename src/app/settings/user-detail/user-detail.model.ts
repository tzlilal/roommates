export class UserDetail {
    constructor(public sex?: String,
        public age?: Number, 
        public regions?: Array<String>, 
        public martialStatus?: String, 
        public hasChildren?: Boolean,
        public occupation?: String, 
        public religion?: String, 
        public kitchen?: String, 
        public diet?: String,
        public smoking?: String,
        public animals: Object = {
            "כלב": false, 
            "חתול": false, 
            "אחר": false
        },
        public playInstrument?: String,
        public cleaning?: String,
        public additionalInfo?: String) {}
}
