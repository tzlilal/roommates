export class UserDetail {
    constructor(public sex?: String,
        public age?: Number, 
        public martialStatus?: String, 
        public hasChildren?: Boolean,
        public occupation?: String, 
        public sexualOrient?: String, 
        public religion?: String, 
        public kosher?: String, 
        public kitchen?: String, 
        public diet?: String,
        public smoking?: Boolean,
        public animals: Object = {
            "כלב": false, 
            "חתול": false, 
            "אחר": false
        },
        public cleaning?: String,
        public additionalInfo?: String) {}
}
