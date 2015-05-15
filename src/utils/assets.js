/**
 * Created by USER on 21.09.2014.
 */

this.keno = this.keno||{};
(function() {

    "use strict";
    var Assets = function () {
        this.initialize();
    };

    //Наследуем
    var p = Assets.prototype;

    /**
     * Конструктор.
     */
    p.initialize = function () {

    }

    Assets.getAllAssets = function() {

        var assets = [
            //tickets
            {src:"assets/img/tickets/type_1.png", id:"type_1"},
            {src:"assets/img/tickets/type_2.png", id:"type_2"},
            {src:"assets/img/tickets/type_3.png", id:"type_3"},
            {src:"assets/img/tickets/type_4.png", id:"type_4"},
            {src:"assets/img/tickets/type_5.png", id:"type_5"},
            {src:"assets/img/tickets/type_1_small.png", id:"type_1_small"},
            {src:"assets/img/tickets/type_2_small.png", id:"type_2_small"},
            {src:"assets/img/tickets/type_3_small.png", id:"type_3_small"},
            {src:"assets/img/tickets/type_4_small.png", id:"type_4_small"},
            {src:"assets/img/tickets/type_5_small.png", id:"type_5_small"},

            //circles
            {src:"assets/img/circles/type_1.png", id:"circle_type_1"},
            {src:"assets/img/circles/type_2.png", id:"circle_type_2"},
            {src:"assets/img/circles/type_3.png", id:"circle_type_3"},
            {src:"assets/img/circles/type_4.png", id:"circle_type_4"},
            {src:"assets/img/circles/type_5.png", id:"circle_type_5"},

            //add ticket
            {src:"assets/img/add_tick_disable.png", id:"add_tick_disable"},
            {src:"assets/img/add_tick_normal.png", id:"add_tick_normal"},
            {src:"assets/img/add_tick_press.png", id:"add_tick_press"},
            {src:"assets/img/add_ticket_popup.png", id:"add_ticket_popup"},
            {src:"assets/img/add_ticket_grid.png", id:"add_ticket_grid"},
            {src:"assets/img/add_ticket_popup_back_red.png", id:"add_ticket_popup_back_red"},

            //chips
            {src:"assets/img/chips/chip_1.png", id:"chips_1"},
            {src:"assets/img/chips/chip_2.png", id:"chips_2"},
            {src:"assets/img/chips/chip_3.png", id:"chips_3"},
            {src:"assets/img/chips/chip_1_small.png", id:"chips_1_small"},
            {src:"assets/img/chips/chip_2_small.png", id:"chips_2_small"},
            {src:"assets/img/chips/chip_3_small.png", id:"chips_3_small"},
            {src:"assets/img/chips/cross.png", id:"cross"},

            //other
            {src:"assets/img/background.png", id:"background"},
            {src:"assets/img/black_chip.png", id:"black_chip"},
            {src:"assets/img/clear_all_disable.png", id:"clear_all_disable"},
            {src:"assets/img/clear_all_normal.png", id:"clear_all_normal"},
            {src:"assets/img/clear_all_press.png", id:"clear_all_press"},
            {src:"assets/img/close_ticket_button.png", id:"close_ticket_button"},
            {src:"assets/img/coefs_grid.png", id:"coefs_grid"},
            {src:"assets/img/complete_ticket_button_normal.png", id:"complete_ticket_button_normal"},
            {src:"assets/img/confirm_disable.png", id:"confirm_disable"},
            {src:"assets/img/confirm_normal.png", id:"confirm_normal"},
            {src:"assets/img/confirm_press.png", id:"confirm_press"},
            {src:"assets/img/counting_label_light.png", id:"counting_label_light"},
            {src:"assets/img/dragon_lleg_skin_mask.png", id:"dragon_lleg_skin_mask"},
            {src:"assets/img/dragon_img_top.png", id:"dragon_img_top"},
            {src:"assets/img/error_back.png", id:"error_back"},
            {src:"assets/img/menu_disable.png", id:"menu_disable"},
            {src:"assets/img/menu_normal.png", id:"menu_normal"},
            {src:"assets/img/menu_press.png", id:"menu_press"},
            {src:"assets/img/progress_line_frame.png", id:"progress_line_frame"},
            {src:"assets/img/progress_green.png", id:"progress_green"},
            {src:"assets/img/progress_red.png", id:"progress_red"},
            {src:"assets/img/progress_yellow.png", id:"progress_yellow"},
            {src:"assets/img/random_ticket_button.png", id:"random_ticket_button"},
            {src:"assets/img/refresh_ticket_button.png", id:"refresh_ticket_button"},
            {src:"assets/img/sort_type_1_button.png", id:"sort_type_1_button"},
            {src:"assets/img/sort_type_2_button.png", id:"sort_type_2_button"},
            {src:"assets/img/sort_type_3_button.png", id:"sort_type_3_button"},
            {src:"assets/img/table_control_normal.png", id:"table_control_normal"},
            {src:"assets/img/table_control_press.png", id:"table_control_press"},
            {src:"assets/img/table_controls_back.png", id:"table_controls_back"},
            {src:"assets/img/table_mask.png", id:"table_mask"},
            {src:"assets/img/ticket_chip_blue.png", id:"ticket_chip_blue"},
            {src:"assets/img/ticket_chip_gray.png", id:"ticket_chip_gray"},
            {src:"assets/img/ticket_chip_green.png", id:"ticket_chip_green"},
            {src:"assets/img/ticket_chip_red.png", id:"ticket_chip_red"},
            {src:"assets/img/ticket_chip_yellow.png", id:"ticket_chip_yellow"},
            {src:"assets/img/stepsball.png", id:"stepsball"},
            {src:"assets/img/light_decor.png", id:"light_decor"},
            {src:"assets/img/light_particles.png", id:"light_particles"},
            {src:"assets/img/ticketwinstateback.png", id:"ticketwinstateback"}



        ];

        return assets;
    }

    keno.Assets = Assets;

})();